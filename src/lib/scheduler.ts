import { PrismaClient } from "@prisma/client";
import { postToDiscord } from "./discord";
const prisma = new PrismaClient();
export async function processScheduledPosts(){
    const now=new Date();
    const duePosts=await prisma.scheduledPost.findMany({
        where:{
            status:"SCHEDULED",
            scheduledFor:{lte:now},
            retryCount:{lt:3}

        },
        include:{
            server:true,
            user:true
        },take:10
    })

    console.log(`Found ${duePosts.length} posts to process`);

    const results=await Promise.allSettled(
        duePosts.map(async(post:any)=>{
            try{
                const message=await postToDiscord(
                    post.channelId,
                    post.generatedContent,
                    post.imageUrls
                )

                await prisma.scheduledPost.update({
                    where:
                    {id:post.id},
                    data:{
                        status:'POSTED',
                        postedAt:now,
                        discordMessageId:message.id
                    }
                })
                 console.log(`✅ Posted: ${post.id}`);
        return { success: true, postId: post.id };
            }catch(error:any){
                console.log(error);
                await prisma.scheduledPost.update({
                    where:{
                        id:post.id
                        },
                        data:{
                            status:post.retryCount>=2?'FAIL':'SCHEDULED',
                            error:error.message,
                            retryCount:post.retryCount+1,
                            scheduledFor:post.retryCount<2?new Date(Date.now()+5*60*1000):post.scheduledFor
                        }
                })
                 return { success: false, postId: post.id, error: error.message };
            }
        })
    )
    return results;
}

export async function cleanupOldPosts(){
    const thirtyDays=new Date();
    thirtyDays.setDate(thirtyDays.getDate()-30);
    const deleted=await prisma.scheduledPost.deleteMany({
        where:{
            OR:[
                {status:'POSTED',postedAt:{lt:thirtyDays}},
                {status:'FAIL',postedAt:{lt:thirtyDays}},

            ]
        }
    })
    console.log(`Cleaned up ${deleted.count} old posts`);
  return deleted;
}