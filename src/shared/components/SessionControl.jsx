/**
 * Optional compact controls. State is supplied by the app so this component
 * cannot start a second polling loop or compete with history persistence.
 */
export default function SessionControl({
  session,
  elapsed,
  error,
  onStart,
  onPause,
  onResume,
  onEnd,
}) {
  const status = session?.status ?? "idle";

  return (
    <div>
      {error && <span>Error: {error.message}</span>}
      <h2>Session Control</h2>
      <p>Status: {status}</p>
      <p>Elapsed: {Math.floor(elapsed / 1000)} sec</p>

      {(status === "idle" || status === "ended") && (
        <button onClick={onStart}>Start</button>
      )}
      {status === "running" && (
        <>
          <button onClick={onPause}>Pause</button>
          <button onClick={onEnd}>End</button>
        </>
      )}
      {status === "pause" && (
        <>
          <button onClick={onResume}>Resume</button>
          <button onClick={onEnd}>End</button>
        </>
      )}
    </div>
  );
}
