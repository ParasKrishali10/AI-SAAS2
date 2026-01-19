"use client"

import { Rocket, Sparkles, CheckCircle2 } from "lucide-react"

export default function FinalCTA() {
  const handleConnectDiscord = () => {
    const discordAuthUrl = new URL("https://discord.com/oauth2/authorize");
    discordAuthUrl.searchParams.append("client_id", process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!);
    discordAuthUrl.searchParams.append("redirect_uri", process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI!);
    discordAuthUrl.searchParams.append("response_type", "code");
    discordAuthUrl.searchParams.append("scope", "identify guilds email bot applications.commands");
    discordAuthUrl.searchParams.append("permissions", "68608");
    window.location.href = discordAuthUrl.toString();
  };

  return (
    <section className="relative py-32 px-4 overflow-hidden bg-slate-950 flex flex-col items-center justify-center min-h-[600px]">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse-slow"></div>

      <div className="relative max-w-4xl mx-auto text-center z-10">

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider mb-8 backdrop-blur-md animate-bounce-slow">
            <Rocket className="w-3 h-3 text-cyan-400" />
            <span>Ready for Liftoff?</span>
        </div>

        <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
          <span className="block text-slate-200">Turn your Discord into an</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            Engagement Machine.
          </span>
        </h2>

        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join thousands of community managers who are automating their growth.
          Start building powerful Discord experiences with AI today.
        </p>

        <div className="flex flex-col items-center gap-6">
           <button
  onClick={handleConnectDiscord}
  className="group relative px-10 py-5 cursor-pointer rounded-full bg-slate-900 text-white font-bold text-xl shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_-10px_rgba(168,85,247,0.7)] transition-all duration-300 transform hover:scale-105"
>
  <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-100 animate-gradientMove pointer-events-none">
     <div className="bg-slate-900 w-full h-full rounded-full"></div>
  </div>

  <div className="relative flex items-center gap-3">
     <Sparkles className="w-6 h-6 text-yellow-300 group-hover:animate-spin-slow" />
     <span>Get Started for Free</span>
  </div>
</button>

            <p className="text-sm text-slate-500 font-mono">No credit card required • Setup in 2 minutes</p>
        </div>

        <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-bold bg-gradient-to-br from-purple-500/${i*20} to-cyan-500/${i*20}`}>
                        {String.fromCharCode(64 + i)}
                    </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-900 flex items-center justify-center text-xs text-white font-bold">
                    +2k
                </div>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Trusted by 2,000+ communities</span>
            </div>
        </div>

      </div>
    </section>
  )
}