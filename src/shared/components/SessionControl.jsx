import { useEffect, useState } from "react";
import { sessionService } from "../../services/sessionService";

export default function SessionControl() {
  //Handle Session time out
  const [session, setSession] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState(null);
  const [showStart, setShowStart] = useState(false);

  useEffect(() => {
    console.log(session);

    setShowStart(true);
    const interval = setInterval(async () => {
      const current = await sessionService.getCurrentSession();
      setSession(current);
      console.log("interval");

      if (current && current.status !== "ended") {
        setElapsed(sessionService.getElapsedTime());
      }
    }, 1000);

    return () => clearTimeout(interval);
  }, []);

  const refreshSession = async () => {
    const current = await sessionService.getCurrentSession();
    setSession(current);
  };
  const handleStart = async () => {
    setShowStart(false);
    try {
      sessionService.start("buttons");
      setError(null)
    } catch (error) {
      setError(error);
    }
    await refreshSession();
  };
  const handlePause = async () => {
    try {
      sessionService.pause();
      setError(null)
    } catch (error) {
      setError(error);
    }
    await refreshSession();
  };
  const handleResume = async () => {
    await refreshSession();
    try {
      sessionService.resume();
      setError(null)
    } catch (error) {
      setError(error);
    }
    await refreshSession();
  };
  const handleEnd = async () => {
    try {
      await sessionService.end();
      setShowStart(true);
      setError(null)
    } catch (error) {
      setError(error);
    }
    await refreshSession();
  };
  if (sessionService.isLimitReached()) {
    console.log("Session limit reached restart session");
    handleEnd();
  }
  return (
    <>
      <div>
        {error && <span>Error: {error.message}</span>}
        <h2>Session Control</h2>
        <p>Status:{session?.status || "Idle"}</p>
        <p>Elapsed: {Math.floor(elapsed / 1000)} sec</p>
        {/* Handle status properly */}
        {/* {!session && <button onClick={handleStart}>Start</button>} */}
        {session?.status === "ended" && (
          <>
            <button onClick={handleStart}>Start</button>
          </>
        )}
        {session?.status === "ended" || showStart && <button onClick={handleStart}>Start</button>}
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
