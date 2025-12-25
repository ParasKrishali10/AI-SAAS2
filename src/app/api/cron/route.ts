import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { postToDiscord } from "@/lib/discord";
import { error } from "console";

export async function GET(request:Request)
{
  const authHeader=request.headers.get('authorization')
  if(authHeader!=`Bearer ${process.env.CRON_SECRET}`)
  {
    return NextResponse.json({error:'Unauthorized'},{status:401})
  }

  const now=new Date()
  console.log('Cron job running at' , now.toISOString())
  try{
    const duePosts=await prisma.scheduledPost.findMany({
      where:{
        status:"SCHEDULED",
        scheduledFor:{
          lte:now
        },
        retryCount:{
          lt:3
        }
      },
      include:{
        user:true
      },
      take:10
    })
    console.log(`Found ${duePosts} post to process`)

    const results=await Promise.allSettled(
      duePosts.map(async(post)=>{
        try{
          console.log(`Posting to channel ${post.channelId}...`)
          const message=await postToDiscord(
               post.channelId,
            post.generatedContent!,
            post.imageUrls
          )
          await prisma.scheduledPost.update({
            where:{
              id:post.id
            },
            data:{
              status:'POSTED',
              postedAt:new Date(),
              discordMessageId:message.id
            }
          })

          console.log(`✅ Posted successfully: ${post.id}`);
          return { success: true, postId: post.id };
        }catch(error:any)
        {
            console.error(`Failed to post ${post.id} : `,error.message)
            await prisma.scheduledPost.update({
              where :{id:post.id},
              data:{
                status:post.retryCount>=2 ?'FAIL':"SCHEDULED",
                error:error.message,
                retryCount:post.retryCount+1,
                scheduledFor:post.retryCount<2?new Date(Date.now() + 5*60*1000):post.scheduledFor
              }
            })
                 return { success: false, postId: post.id, error: error.message };
        }

      })
    )
        return NextResponse.json({
      success: true,
      processed: duePosts.length,
      results,
    });
  }catch(error:any)
  {
    console.log(error)
     return NextResponse.json({ error: error.message }, { status: 500 });
  }

}