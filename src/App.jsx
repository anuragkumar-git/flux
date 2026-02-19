import { useEffect, useState } from "react";
import { SessionEngine } from "./modules/session/engine/sessionEngine";

function App() {
  // useEffect(() => {
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
    //   const result = engine.endSession();
    //   console.log("Final session:", result);
    //   console.log("Elapsed Time:", engine.getElapsedTime());
    // }, 8000);

    // window.engine = new SessionEngine();
    // console.log("Engine attached to window as 'engine'");
  // }, []);
  return (
    <>
      <h1>Flux</h1>{" "}
    </>
  );
}

export default App;
