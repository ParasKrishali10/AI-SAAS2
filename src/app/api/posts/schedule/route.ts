import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function POST(req:Request){

    const {userId,serverId,channelId,description,generatedContent,imageUrls,scheduledFor}=await req.json();
      if (!userId || !serverId || !channelId || !generatedContent || !scheduledFor) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try{
      const post=await prisma.scheduledPost.create({
        data:{
            userId,
            serverId,channelId,
            description,generatedContent,
            imageUrls:imageUrls||[],
            scheduledFor: new Date(scheduledFor),
            status:'SCHEDULED'
        },
        include:{
            server:true
        }
      })

      return NextResponse.json({ success: true, post });

  }catch(error:any)
  {
    console.error('Scheduling error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }


}

export async function GET(req:Request)
{
    const {searchParams}=new URL(req.url)
    const userId=searchParams.get('userId')
    if(!userId)
    {
        return NextResponse.json({error:'User Id Required'},{status:400})
    }

    const posts=await prisma.scheduledPost.findMany({
        where:{userId},
        include:{
            server:true
        },orderBy:{
            scheduledFor:'asc'
        }
    })

    return NextResponse.json({posts})
}

export async function DELETE(req:Request){
    const {searchParams}=new URL(req.url)
    const postId=searchParams.get('postId')
    if (!postId) {
  return NextResponse.json({ error: 'Post ID required' }, { status: 400 });
}
await prisma.scheduledPost.update({
  where: { id: postId },
  data: { status: 'FAIL' },
});

return NextResponse.json({ success: true });


}