export  default function FuturisticFrame({ children }: { children: React.ReactNode }) {
  return (
   <div className="relative group">
      <div className="absolute -inset-1 rounded-[2.5rem] blur-xl opacity-70 group-hover:opacity-100 transition duration-1000"></div>

      <div className="relative bg-slate-950/80 backdrop-blur-xl rounded-[2rem] border border-white/5 p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-cyan-400 rounded-tl-[1.5rem] drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
        <div className="absolute top-0 right-0 w-16 h-16 border-t-[3px] border-r-[3px] border-purple-500 rounded-tr-[1.5rem] drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[3px] border-l-[3px] border-purple-500 rounded-bl-[1.5rem] drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-cyan-400 rounded-br-[1.5rem] drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent translate-y-[-100%] group-hover:animate-[scan_3s_ease-in-out_infinite] pointer-events-none"></div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}