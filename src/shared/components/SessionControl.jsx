import { useEffect, useState } from "react";
import { sessionService } from "../../services/sessionService";

export default function SessionControl() {
  //Handle Session time out
  const [session, setSession] = useState(null);
  const [elapsed, setElapsed] = useState(0);

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

  const handleStart = () => {
    sessionService.start("manual test");
  };
  const handlePause = () => {
    sessionService.pause();
  };
  const handleResume = () => {
    sessionService.resume();
  };
  const handleEnd = async () => {
    await sessionService.end();
  };
  return (
    <>
      <div>
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
