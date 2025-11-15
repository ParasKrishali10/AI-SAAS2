import { NextResponse } from "next/server";
import OpenAI from "openai";
const client=new OpenAI({
  apiKey:process.env.OPENAI_API_KEY!
})
export async function PUT(req:Request){
  try{
     const { description, generatedImages, tone, length,prompts } = await req.json();
       if (!description) {
      return NextResponse.json(
        { error: "Description is required" },
        { status: 400 }
      );
    }
    const prompt=`Write a Discord post based on this idea:

"${description}"

Tone: ${tone || "Casual"}
Length: ${length || "Medium"}

Rules:
- Sound natural and engaging.
- use appropriate emojis to make it more engaging.
- Keep formatting clean.
;`

const completion=await client.chat.completions.create({
  model:"gpt-4o-mini",
   messages: [
        { role: "system", content: "You generate high-quality Discord posts." },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      max_tokens: 500,
})

  const content=completion.choices[0]?.message?.content || ""
   let imageUrls: string[] = [];

    if (generatedImages) {
      imageUrls = await generateHuggingFaceImages([prompts]);
    }

    return NextResponse.json({
      content,
      imageUrls,
    });

  }catch (error: any) {
    console.error(" API ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}


async function generateHuggingFaceImages(prompts: string[]): Promise<string[]> {
  const imageUrls: string[] = [];

  for (const prompt of prompts) {
    try {
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              negative_prompt: "blurry, distorted, low quality",
              num_inference_steps: 30,
            },
          }),
        }
      );

      if (!response.ok) {
        console.error("HuggingFace error:", await response.text());
        continue;
      }

      const blob = await response.blob();
      const buffer = Buffer.from(await blob.arrayBuffer());
      const base64 = buffer.toString("base64");

      imageUrls.push(`data:image/png;base64,${base64}`);

    } catch (error) {
      console.error(" Image generation error:", error);
    }
  }

  return imageUrls;
}
