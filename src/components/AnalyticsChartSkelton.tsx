export function AnalyticsChartSkeleton() {
  return (
    <div className="w-full h-[250px] rounded-xl bg-slate-950/50 border border-white/5 p-4 animate-pulse">

      <div className="relative w-full h-full bg-slate-900/70 rounded-lg overflow-hidden">

        <div className="absolute inset-0 flex flex-col justify-between px-4 py-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-px bg-slate-800/80" />
          ))}
        </div>

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="skeletonGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          <path
            d="M0,80 C15,60 30,65 45,50 C60,35 75,45 90,30 L100,35 L100,100 L0,100 Z"
            fill="url(#skeletonGradient)"
          />
          <path
            d="M0,80 C15,60 30,65 45,50 C60,35 75,45 90,30"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2"
          />
        </svg>

        <div className="absolute bottom-2 left-4 right-4 flex justify-between">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-2 w-8 bg-slate-800 rounded" />
          ))}
        </div>

        <div className="absolute left-2 top-3 bottom-6 flex flex-col justify-between">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-2 w-6 bg-slate-800 rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}
