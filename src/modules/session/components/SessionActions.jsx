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
              className="px-6 py-2.5 rounded-full text-white font-medium bg-linear-to-r from-emerald-500 to-emerald-600 shadow-md shadow-emerald-200/50 hover:from-emerald-600 hover:to-emerald-700 hover:shadow-lg hover:shadow-emerald-300/40 active:scale-95 transition-all duration-200"
            >
              Start
            </button>
          </>
        )}

        {status === "running" && (
          <>
            <button
              onClick={onPause}
              className="px-6 py-2.5 rounded-xl text-white font-medium bg-linear-to-r from-amber-500 to-amber-400 shadow-md shadow-amber-200/40 hover:from-amber-500 hover:to-amber-600 hover:shadow-lg hover:shadow-amber-300/40 active:scale-95 transition-all duration-200"
            >
              Pause
            </button>
            <button
              onClick={onEnd}
              className="px-6 py-2.5 rounded-xl text-white font-medium bg-linear-to-r from-rose-500 to-rose-600 shadow-md shadow-rose-200/40 hover:from-rose-600 hover:to-rose-700 hover:shadow-lg hover:shadow-rose-300/40 active:scale-95 transition-all duration-200"
            >
              End
            </button>
          </>
        )}

        {status === "pause" && (
          <>
            <button
              onClick={onResume}
              className="px-6 py-2.5 rounded-xl text-white font-medium bg-linear-to-r from-emerald-500 to-emerald-400 shadow-md shadow-emerald-200/40 hover:from-emerald-500 hover:to-emerald-600 hover:shadow-lg hover:shadow-emerald-300/40 active:scale-95 transition-all duration-200"
            >
              Resume
            </button>
            <button
              onClick={onEnd}
              className="px-6 py-2.5 rounded-xl text-white font-medium bg-linear-to-r from-rose-500 to-rose-600 shadow-md shadow-rose-200/40 hover:from-rose-600 hover:to-rose-700 hover:shadow-lg hover:shadow-rose-300/40 active:scale-95 transition-all duration-200"
            >
              End
            </button>
          </>
        )}
      </div>
    </>
  );
}
