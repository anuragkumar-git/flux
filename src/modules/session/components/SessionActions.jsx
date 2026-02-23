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
              className="px-4 py-2 bg-blue-600 text-white rounded-full"
            >
              Start
            </button>
          </>
        )}

        {status === "running" && (
          <>
            <button
              onClick={onPause}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
            >
              Pause
            </button>
            <button
              onClick={onEnd}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              End
            </button>
          </>
        )}

        {status === "pause" && (
          <>
            <button
              onClick={onResume}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Resume
            </button>
            <button
              onClick={onEnd}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              End
            </button>
          </>
        )}
      </div>
    </>
  );
}
