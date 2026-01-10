export default function ASkelton(){
    return (
        <div className="relative mb-8 pl-12 animate-pulse">

    <div className="absolute left-6 top-7 h-3 w-3 -translate-x-1/2 rounded-full bg-slate-800 border border-slate-700 z-20" />

    <div className="w-full rounded-2xl bg-white/[0.02] border border-white/5 px-6 py-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">

          <div className="h-5 w-48 rounded-md animate-skeleton" />
        </div>

        <div className="flex flex-col items-end gap-2">

          <div className="h-4 w-16 rounded-md animate-skeleton" />

          <div className="h-4 w-20 rounded-md animate-skeleton opacity-50" />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <div className="h-3 w-full rounded-md animate-skeleton" />
        <div className="h-3 w-[92%] rounded-md animate-skeleton" />
        <div className="h-3 w-[40%] rounded-md animate-skeleton" />
      </div>
    </div>
  </div>
    )
}