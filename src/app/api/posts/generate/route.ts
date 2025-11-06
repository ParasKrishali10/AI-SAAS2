import { NextResponse } from "next/server";
import {generatedContent,generatedImages} from '@/lib/ai'

export async function POST(req:Request)
{
    const {description,generatedImages:shouldGenerateImages}=await req.json()
      if (!description) {
    return NextResponse.json({ error: 'Description required' }, { status: 400 });
  }

  try{
    const generated=await generatedContent(description,shouldGenerateImages)
        if (shouldGenerateImages && generated.imagePrompts && generated.imagePrompts.length > 0){
            generated.image=await generatedImages(generated.imagePrompts)
        }

        return NextResponse.json(generated)
  }catch(error:any)
  {
    console.error('Content generation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}