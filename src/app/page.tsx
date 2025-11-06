"use client"
import ParticleBackground from "@/components/ParticleBackground"
import { Diamond } from "lucide-react"
export default function Home() {

  const handleConnectDiscord=()=>{
     const discordAuthUrl = new URL('https://discord.com/oauth2/authorize');

    discordAuthUrl.searchParams.append('client_id',process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);
    discordAuthUrl.searchParams.append('redirect_uri', process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!);
    discordAuthUrl.searchParams.append('response_type', 'code');
    discordAuthUrl.searchParams.append('scope', 'identify guilds email');

    // Redirect user to Discord authorization page
    window.location.href = discordAuthUrl.toString();
  };


  return <div className="relative w-full overflow-hidden font-serif bg-gradient-to-br from-[#0a0e27] to-[#1a1f3a] flex items-center justify-center min-h-screen">
        <ParticleBackground/>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#a855f7] text-transparent bg-clip-text">
                Automate Your Discord with AI Magic
          </h1>
          <p className="text-pretty mt-6 text-xl md:text-2xl text-gray-300">
            Generate content, schedule posts, and grow your community on autopilot
          </p>

          <div className="flex justify-center gap-6 mt-10">
              <button className="relative flex gap-2 items-center bg-black text-white px-3 py-2 md:px-4 md:py-3 rounded-xl cursor-pointer text-xl font-semibold transition-transform duration-500 hover:scale-110 group overflow-hidden" onClick={handleConnectDiscord}>

  <span className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#22d3ee] animate-gradientMove opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <span className="block bg-black rounded-[10px] w-full h-full"></span>
  </span>


  <Diamond className="mt-0.5 z-10" />
  <span className="z-10" >Connect Discord</span>
</button>
              <button className="relative flex gap-2 items-center bg-black text-white px-3 py-2 md:px-4 md:py-3 rounded-xl cursor-pointer text-xl font-semibold transition-transform duration-500 hover:scale-110 group overflow-hidden">
               <span className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-[#00d4ff] via-[#a855f7] to-[#22d3ee] animate-gradientMove opacity-0 group-hover:opacity-100 transition-opacity duration-500">
    <span className="block bg-black rounded-[10px] w-full h-full"></span>
  </span>
                 <span className="z-10">View Demo</span>
              </button>
          </div>
        </div>
  </div>
}