"use client"
import { useEffect, useState } from "react"
import { Image ,Sparkles,Volume2 } from 'lucide-react';
import toast from "react-hot-toast";
import axios from "axios";
import { generatedImages } from "@/lib/ai";
import ParticleBackground from "@/components/ParticleBackground";
import { div } from "framer-motion/client";
const PLACEHOLDER_EXAMPLES = [
  "Write about the latest Discord features and updates...",
  "Create a community announcement for your server...",
  "Draft a fun event invitation for your members...",
  "Share exciting news about your project launch...",
  "Post motivational content to inspire your community...",
]
const IMAGE_PLACEHOLDER_EXAMPLES = [
  "A futuristic neon Discord bot mascot glowing in purple and blue",
  "Cute chibi-style gamer character sitting at a RGB-lit desk",
  "Cyberpunk city skyline with floating holograms and neon signs",
  "A cozy aesthetic room with PC setup and warm ambient lighting",
  "Epic fantasy dragon flying over a glowing crystal mountain",
  "Minimalist flat-design banner with gradient colors",
  "Cartoon-style characters celebrating a community milestone",
  "Space-themed artwork with planets and cosmic trails",
  "Vibrant abstract background for a Discord announcement",
  "Modern 3D render of a robot holding a holographic chat bubble",
];

const tones = ["Friendly", "Professional", "Casual", "Formal", "Funny"];
const length=["Short","Medium","Long"]
interface GeneratedPost{
    content:string;
    imageUrls:string[]
}

export default function CreatePost(){
    const [placeholder,setPlaceholder]=useState(0)
    const [placeholderImage,setPlaceholderImage]=useState(0)
    const [isFocused1, setIsFocused1] = useState(false)
    const [isFocused2, setIsFocused2] = useState(false)
    const [desc,setDesc]=useState("")
    const [generation,setGeneration]=useState(false)
    const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
    const [generatedImages,setGeneratedImages]=useState(false)
    const [images, setImages] = useState<string[]>([]);
    const [prompts,setPrompts]=useState("");
    const [selectedTone, setSelectedTone] = useState("Professional");
    const [selectedLength,setSelectedLength]=useState("Short")
    const handleFocus1 = () => {
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };
    const handleFocus2 = () => {
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
  };

  const handlePostGeneration=async()=>{
    if(!desc.trim())
    {
        toast.error("Please enter the description")
        return ;
    }
    setGeneration(true)
    try{
        const response=await axios.post("/api/posts/generate",{
            description:desc.trim(),
            generatedImages:generatedImages,
            tone:selectedTone,
            length:selectedLength,
            prompts
        })
       const data= await response.data
       const post:GeneratedPost={
        content:data.content,
        imageUrls: data.imageUrls || [],
       }
       setGeneratedPost(post)
    }catch(error:any)
    {
        console.log(error)
        toast.error("Failed to fetch the posts")
        return
    }finally{
        setGeneration(false)
    }

  }
  const handleImageGeneration=async()=>{
    if(!prompts)
    {
      toast.error("Please write prompt for image generation")
      return
    }
    setGeneration(true)
    try{
        const response=await axios.post("/api/posts/generate",{
            description:desc.trim(),
            generatedImages:generatedImages,
            tone:selectedTone,
            length:selectedLength,
            prompts
        })
       const data= await response.data
       const post:GeneratedPost={
        content:data.content,
        imageUrls: data.imageUrls || [],
       }
       setGeneratedPost(post)
    }catch(error:any)
    {
        console.log(error)
        toast.error("Failed to fetch the posts")
        return
    }finally{
        setGeneration(false)
    }

  }

    useEffect(()=>{
        const interval=setInterval(()=>{
            setPlaceholder((prev)=>(prev+1)%PLACEHOLDER_EXAMPLES.length)
            setPlaceholderImage((prev)=>(prev+1)%IMAGE_PLACEHOLDER_EXAMPLES.length)
        },3000)
        return ()=>clearInterval(interval)

    },[])
    return <div className="relative">
      <div className="absolute inset-0 -z-20">
      <ParticleBackground></ParticleBackground>

      </div>
<div className="absolute inset-0 flex justify-center items-start -z-10 pointer-events-none">
        <div
          className="
            mt-32 w-[700px] h-[700px]
            bg-[radial-gradient(circle_at_40%_40%,rgba(0,200,255,0.30),transparent_60%),
                radial-gradient(circle_at_70%_70%,rgba(170,80,255,0.25),transparent_60%),
                radial-gradient(circle_at_30%_80%,rgba(255,0,230,0.20),transparent_60%)]
            blur-[140px]
          "
        ></div>
      </div>
            <div className="relative flex flex-col mt-10 ml-6 mr-8">
                <div  className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-cyan-400 via-purple-500 to-cyan-300">
                    AI Post Creator
                </div>
                <div className="mt-2 text-gray-600 text-lg font-semibold">
                    Step 1 of 3 - Create and schedule your Discord posts
                </div>
                <div className="mt-6 text-xl font-bold flex gap-2 items-center">
                    <Sparkles className="mt-0.5 text-cyan-500"/>
                   <span>Post description {prompts} </span>
                </div>
                <div
   className={`mt-4 rounded-xl transition-all duration-300 backdrop-blur-md
            ${isFocused1 ? "ring-2 ring-cyan-500 shadow-[0_0_40px_rgba(0,200,255,0.3)]" : "border border-white/10 bg-white/5"}
          `}
>
  <textarea
    value={desc}
    onChange={(e) => {
  const newText = e.target.value;
  const truncatedText = newText.slice(0, 2000);
  setDesc(truncatedText);
}}
    placeholder={PLACEHOLDER_EXAMPLES[placeholder]} onFocus={handleFocus1}
        onBlur={handleBlur1}
    className="text-lg w-full h-64 bg-card/50 text-foreground placeholder-muted-foreground p-4 rounded-lg resize-none focus:outline-none"
  />
</div>
                <div className={`mt-3 ${desc.length>500?"text-red-400":"text-green-400"} text-md` }>
                {desc.length}/2000 characters
                </div>
               <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">

          <div className="flex justify-between items-center">
            <div className="text-xl text-white font-semibold">Generate Images</div>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={generatedImages}
                onChange={() => setGeneratedImages(!generatedImages)}
                className="sr-only peer"
              />
              <div className="w-12 h-7 bg-white/10 rounded-full peer-checked:bg-cyan-400 transition-all"></div>
              <div className="absolute left-1 top-1 h-5 w-5 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
            </label>
          </div>

          <p className="text-gray-400 text-sm mt-1">Include an AI-generated image with your post</p>
          <div className="mt-2">
            <div className="flex gap-2">
              <Volume2 className="mt-4.5"/>
          <div className="mt-4 text-xl text-white font-semibold mb-3 items-center">
            Tone
          </div>

            </div>

      <div className="flex gap-3 mt-2">
        {tones.map((tone) => {
          const isActive = selectedTone === tone;

          return (
            <button
              key={tone}
              onClick={() => setSelectedTone(tone)}
              className={`
                px-5 py-2 rounded-full text-lg font-medium transition-all

                ${isActive
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black shadow-lg shadow-purple-500/30"
                  : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 scale-100 hover:scale-110 transition duration-300 ease-in-out hover:border-indigo-600"
                }
              `}
            >
              {tone}
            </button>
          );
        })}
      </div>

          </div>
          <div>
            <div className="mt-6 text-lg text-white font-semibold mb-3 items-center">
              Content Length
            </div>
            <div className="flex gap-3 mt-2">
        {length.map((len) => {
          const isActive = selectedLength === len;

          return (
            <button
              key={len}
              onClick={() => setSelectedLength(len)}
              className={`
                px-5 py-2 rounded-full text-lg font-medium transition-all

                ${isActive
                  ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black shadow-lg shadow-purple-500/30"
                  : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 scale-100 hover:scale-110 transition duration-300 ease-in-out hover:border-indigo-600"
                }
              `}
            >
              {len}
            </button>
          );
        })}
      </div>

          </div>
        </div>
        {generatedImages && (
          <div>

         <div className="mt-6 text-xl font-bold flex gap-2 items-center">
                    <Image className="text-cyan-500"/>
                   <span>Image description {generatedPost?.imageUrls} </span>
                </div>
                 <div
  className={`mt-6 relative rounded-lg transition-all duration-300 ${
    isFocused2
      ? "ring-2 ring-cyan-500 shadow-2xl shadow-indigo-600/50"
      : "border border-white/10 bg-white/5"
  }`}
>
  <textarea
    value={prompts}
    onChange={(e) => {
  const newText = e.target.value;
  const truncatedText = newText.slice(0, 2000);
  setPrompts(truncatedText);
}}
    placeholder={IMAGE_PLACEHOLDER_EXAMPLES[placeholderImage]} onFocus={handleFocus2}
        onBlur={handleBlur2}
    className="text-lg w-full h-40 bg-card/50 text-foreground placeholder-muted-foreground p-4 rounded-lg resize-none focus:outline-none"
  />
</div>
          </div>
        )}

                <div className="grid gap-4 sm: grid-cols-1 md:grid-cols-2 mb-5">
                    <button className="mt-6 text-white  bg-gradient-to-br  from-[#00d4ff] to-[#a855f7] p-4 text-xl text-black font-medium rounded-md cursor-pointer flex gap-2 items-center justify-center" onClick={handlePostGeneration}>
                          <Sparkles/>
                          <span>Generate Post</span>
                    </button>
                    <button className="mt-6 text-white  bg-gradient-to-br  from-[#00d4ff] to-[#a855f7] p-4 text-xl text-black font-medium rounded-md cursor-pointer flex gap-2 items-center justify-center" onClick={handleImageGeneration}>
                             <Sparkles/>
                          <span>Generate Post With Image</span>
                    </button>
                </div>
{images.map((img, i) => (
  <img key={i} src={img} alt={`Generated image ${i}`} />
))}

            </div>
    </div>
}