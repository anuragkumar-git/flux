export default function SessionActions({
  session,
  onStart,
  onPause,
  onResume,
  onEnd,
}) {
  const status = session?.status || "idle";

  return (
    <>
      <div className="mt-4 flex justify-center gap-3">
        {(status === "idle" || status === "ended") && (
          <>
            <button
              onClick={onStart}
              className="rounded-full border border-cyan-100/25 bg-linear-to-br from-blue-400 to-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-950/60 transition-all duration-200 hover:scale-[1.03] hover:from-blue-300 hover:to-blue-500 hover:shadow-blue-500/25 active:scale-95 focus:outline-none focus:scale-95"
              autoFocus
            >
              Start
            </button>
          </>
        )}

        {status === "running" && (
          <>
            <button
              onClick={onPause}
              className="rounded-full border border-blue-100/15 bg-slate-700/55 px-6 py-3 font-medium text-slate-100 shadow-lg shadow-black/20 transition hover:scale-[1.03] hover:bg-slate-600/70 active:scale-95 focus:outline-none focus:scale-95"
              autoFocus
            >
              Pause
            </button>
            <button
              onClick={onEnd}
              className="rounded-full border border-rose-200/10 bg-rose-500/85 px-6 py-3 font-medium text-white shadow-lg shadow-rose-950/50 transition hover:scale-[1.03] hover:bg-rose-400 active:scale-95 focus:scale-95"
            >
              End
            </button>
          </>
        )}

        {status === "pause" && (
          <>
            <button
              onClick={onResume}
              className="rounded-full border border-cyan-100/25 bg-linear-to-br from-cyan-400 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-950/60 transition hover:scale-[1.03] hover:from-cyan-300 hover:to-blue-500 active:scale-95 focus:outline-none focus:scale-95"
              autoFocus
            >
              Resume
            </button>
            <button
              onClick={onEnd}
             className="rounded-full border border-rose-200/10 bg-rose-500/85 px-6 py-3 font-medium text-white shadow-lg shadow-rose-950/50 transition hover:scale-[1.03] hover:bg-rose-400 active:scale-95 focus:scale-95"
            >
              End
            </button>
          </>
        )}
      </div>
    </>
  );
}
