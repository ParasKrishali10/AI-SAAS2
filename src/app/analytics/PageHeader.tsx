export default function PageHeader(){
 return <div className="w-full pt-10 pb-8 relative">
      {/* 1. Dashboard Toggle Area (Stays fixed at the far left) */}
      <div className="absolute left-8 top-10 w-12 flex justify-center">
        {/* Your Sidebar Menu Button Goes Here */}
      </div>

      {/* 2. Indented Header Content */}
      <div className="pl-24 pr-12 flex flex-col gap-1">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
          <span>Main Dashboard</span>
          <span className="text-slate-800">/</span>
          <span className="text-blue-500">Content Analytics</span>
        </div>

        {/* Main Title Row */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-5xl font-extrabold text-white tracking-tight">
              Activity <span className="text-blue-600">Timeline</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Reviewing post performance across all connected channels.
            </p>
          </div>

          {/* Live Badge (Moved to far right to avoid clutter) */}
          <div className="flex items-center gap-3 bg-slate-900/80 border border-white/5 px-4 py-2 rounded-full backdrop-blur-xl shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Live Updates</span>
          </div>
        </div>
      </div>
    </div>
}