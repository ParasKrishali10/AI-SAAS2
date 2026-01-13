export default function PostCardSkeleton() {
  return (
    <div className="relative animate-pulse">

      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-2xl blur opacity-30" />

      <div className="relative h-full flex flex-col rounded-2xl bg-slate-950/90 border border-white/10 p-6 overflow-hidden">

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-800" />
            <div className="space-y-2">
              <div className="h-3 w-24 bg-slate-800 rounded" />
              <div className="h-2 w-16 bg-slate-800 rounded" />
            </div>
          </div>
          <div className="h-6 w-20 bg-slate-800 rounded-full" />
        </div>

        <div className="mb-4 space-y-2">
          <div className="h-3 w-full bg-slate-800 rounded" />
          <div className="h-3 w-full bg-slate-800 rounded" />
          <div className="h-3 w-2/3 bg-slate-800 rounded" />
        </div>

        <div className="h-48 w-full bg-slate-800 rounded-xl mb-4" />

        <div className="mt-auto space-y-3">
          <div className="flex justify-between">
            <div className="h-2 w-20 bg-slate-800 rounded" />
            <div className="h-2 w-24 bg-slate-800 rounded" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="h-8 bg-slate-800 rounded-lg" />
            <div className="h-8 bg-slate-800 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
