import { useEffect, useState } from "react";
import { SessionEngine } from "./modules/session/engine/sessionEngine";
import { ensureDayExists, getAllDays } from "./storage/dayRepository";
import { saveSession } from "./storage/sessionRepository";
import { sessionService } from "./services/sessionService";
import SessionControl from "./shared/components/SessionControl";

function App() {
  useEffect(() => {
    // const engine = new SessionEngine();

    // console.log("Starting session...");
    // engine.startSession("Testing session");

    // setTimeout(() => {
    //   console.log("Pausing...");
    //   engine.pauseSession();
    // }, 2000);

    // setTimeout(() => {
    //   console.log("Resuming...");
    //   engine.resumeSession();
    // }, 7000);

    // setTimeout(() => {
    //   console.log("Ending session...");
    //   const result = engine.endedSession();
    //   console.log("Final session:", result);
    //   console.log("Elapsed Time:", engine.getElapsedTime());
    // }, 8000);

    window.service = sessionService;
    console.log("Service attached to window as 'service'");
    // async function testStorage() {
    //   const dayId = "2026-02-01";

    //   await ensureDayExists(dayId);

    //   await saveSession(
    //     {
    //       id: crypto.randomUUID(),
    //       startTime: Date.now(),
    //       endTime: Date.now(),
    //       status: "ended",
    //       totalActiveDuration: 5000,
    //       customLimitMs: 10000,
    //       description: "Test",
    //     },
    //     dayId,
    //   );

    //   console.log("Data saved Successfully");
    // }

    // testStorage();
  }, []);
  return (
    <>
      <h1>Flux</h1> <SessionControl />
    </>
  );
}

export default App;
