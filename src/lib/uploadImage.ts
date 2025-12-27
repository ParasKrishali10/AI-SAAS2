import {createClient} from '@supabase/supabase-js';

const supabase=createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function uploadBase64Image(
    base64:string,
    filename:string
):Promise<string> {
    const cleaned=base64.replace(/^data:image\/\w+;base64,/, "")
    const buffer=Buffer.from(cleaned,"base64")
    const {error}=await supabase.storage.from("discord-images").upload(filename,buffer,{
        contentType:"image/png",
        upsert:true
    })
    if(error)
    {
        console.log(error)
        throw new Error(error.message)
    }
    const {data}=supabase.storage.from("discord-images").getPublicUrl(filename)
    return data.publicUrl

}