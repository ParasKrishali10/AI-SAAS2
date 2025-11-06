import { GeneratedContent } from "@/types";

const GEMINI_API='https://generativelanguage.googleapis.com/v1beta'

export async function generatedContent(
    description:string,
    generatedImages:boolean=false
):Promise<GeneratedContent>{

    let prompt=`You are a social media content creator for Discord .
    Based on this following , create a engaging , concise Discord post
    Description: "${description}".
    The post should be:
    - Engaging and conversational
    - Include relevant emojis where appropriate
    - Be platform-appropriate for Discord
    - Have a clear message
        Just return the post content, nothing else.
    `
    if(generatedImages){
         prompt += `\n\nAfter the post content, on a new line starting with "IMAGE_PROMPTS:", provide 1-2 detailed image generation prompts that would complement this post. Separate multiple prompts with " | ".`
    }

    try{
        const response=await fetch(`${GEMINI_API}/models/gemini-pro:generateContent>key=${process.env.GEMINI_API_KEY}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                contents:[
                    {
                        parts:[
                            {
                                text:prompt,
                            }
                        ]
                    }
                ],generatedConfig:{
                    temperature:0.9,
                    maxOutputTokens:1024
                }
            })

        })
        if (!response.ok) {
      throw new Error('Failed to generate content');
    }
    const data=await response.json()
    const generatedText=data.candidates[0].content.parts[0].text
    const result:GeneratedContent={
        content:'',
        imagePrompts:[],
        image:[],
    };
    if(generatedImages && generatedText.includes('IMAGE_PROMPTS')){
        const [content,imageSection]=generatedText.split('IMAGE_PROMPTS:')
        result.content=content.trim()
        result.imagePrompts=imageSection.trim().split('|').map((p:string)=>p.trim()).filter((p:string)=>p.length>0)
    }else{
        result.content=generatedText.trim()
    }
    return result;
}catch(error)
    {
        console.log(error)
        return {
    content: "An error occurred while generating content.",
    imagePrompts: [],
    image: [],
  };
    }
}

export async function generatedImages(prompts:string[]):Promise<string[]>{
    const urls:string[]=[]
    for(const prompt of prompts){
        const response=await fetch(
            "https://api-inference.huggingface.co/models/Qwen/Qwen-Image",{
                method: "POST",
                headers: {
                "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: prompt }),
            }
        )
        if(!response.ok){
            console.error(`Error generating image: ${response.statusText}`);
            urls.push("https://placehold.co/800x600?text=Image+Failed");
            continue;
        }

        const blob=await response.blob();
        const buffer=Buffer.from(await blob.arrayBuffer());
        const base64=buffer.toString("base64");
        const imageUrl=`data:image/png;base64,${base64}`
        urls.push(imageUrl);
    }
    return urls;
}