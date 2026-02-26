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
      <div className="flex gap-3 justify-center mt-4">
        {(status === "idle" || status === "ended") && (
          <>
            <button
              onClick={onStart}
              className="px-6 py-2.5 rounded-full text-white font-medium  bg-cyan-500 shadow-md shadow-emerald-200/50 hover:from-cyan-600 hover:to-cyan-700 hover:shadow-lg hover:shadow-cyan-300/40 active:scale-95 transition-all duration-200"
            >
              Start
            </button>
          </>
        )}

        {status === "running" && (
          <>
            <button
              onClick={onPause}
              className="px-6 py-2.5 rounded-full text-slate-200  hover:text-white font-medium bg-linear-to-r from-slate-600 to-slate-800 shadow-md shadow-slate-200/40 hover:from-slate-800 hover:to-slate-900 hover:shadow-lg hover:shadow-slate-800/40 active:scale-95 transition-all duration-200"
            >
              Pause
            </button>
            <button
              onClick={onEnd}
              className="px-6 py-2.5 rounded-full text-white font-medium bg-linear-to-r from-red-500 to-rose-600 shadow-md shadow-rose-200/40 hover:from-rose-600 hover:to-red-700 hover:shadow-lg hover:shadow-rose-300/40 active:scale-95 transition-all duration-200"
            >
              End
            </button>
          </>
        )}

        {status === "pause" && (
          <>
            <button
              onClick={onResume}
              className="px-6 py-2.5 rounded-full text-slate-50 font-medium bg-linear-to-r from-cyan-500  to-cyan-500  shadow-md shadow-cyan-200/40 hover:from-cyan-600 hover:to-cyan-900 hover:shadow-lg hover:shadow-emerald-300/40 active:scale-95 transition-all duration-200"
            >
              Resume
            </button>
            <button
              onClick={onEnd}
             className="px-6 py-2.5 rounded-full text-white font-medium bg-linear-to-r from-red-500 to-rose-600 shadow-md shadow-rose-200/40 hover:from-rose-600 hover:to-red-700 hover:shadow-lg hover:shadow-rose-300/40 active:scale-95 transition-all duration-200"
            >
              End
            </button>
          </>
        )}
      </div>
    </>
  );
}
