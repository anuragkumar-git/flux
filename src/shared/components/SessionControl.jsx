import { useEffect, useState } from "react";
import { sessionService } from "../../services/sessionService";

export default function SessionControl() {
  //Handle Session time out
  const [session, setSession] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const interval = setInterval(async () => {
      const current = await sessionService.getCurrentSession();
      setSession(current);

      if (current && current.status !== "ended") {
        setElapsed(sessionService.engine.getElapsedTime());
      }
    }, 1000);

    return () => clearTimeout(interval);
  }, []);

  const refreshSession = async () => {
    const current = await sessionService.getCurrentSession();
    setSession(current);
  };
  const handleStart = async () => {
    try {
      sessionService.start("session timeout?");
    } catch (error) {
      setError(error);
    }
    await refreshSession();
  };
  const handlePause = async () => {
    try {
      sessionService.pause();
    } catch (error) {
      setError(error);
    }
    await refreshSession();
  };
  const handleResume = async () => {
    try {
      sessionService.resume();
    } catch (error) {
      setError(error);
    }
    await refreshSession();
  };
  const handleEnd = async () => {
    try {
      await sessionService.end();
    } catch (error) {
      setError(error);
    }
    await refreshSession();
  };
  if (sessionService.engine.isLimitReached()) {
    console.log("Session limit reached restart session");
    handleEnd()
  }
  return (
    <>
      <div>
        {error && <span>Error: {error.message}</span>}
        <h2>Session Control</h2>
        <p>Status:{session?.status || "Idle"}</p>
        <p>Elapsed: {Math.floor(elapsed / 1000)} sec</p>
        {!session && <button onClick={handleStart}>Start</button>}
        {session?.status === "running" && (
          <>
            <button onClick={handlePause}>Pause</button>
            <button onClick={handleEnd}>End</button>
          </>
        )}
        {session?.status === "pause" && (
          <>
            <button onClick={handleResume}>Resume</button>
            <button onClick={handleEnd}>End</button>
          </>
        )}
      </div>
    </>
  );
}
