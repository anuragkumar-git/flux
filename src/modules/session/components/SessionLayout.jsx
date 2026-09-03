import { useState } from "react";
import { formatDurationLabel } from "../utils/formatDurationLabel";

export default function SessionLayout({
  main,
  sidebar,
  session,
  customLimitMs,
  onSetCustomLimit,
  sessionName,
  onSetSessionName,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isLimitOpen, setIsLimitOpen] = useState(false);
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(30);

  const isSessionActive =
    session?.status === "running" || session?.status === "pause";

  const hasLimit = Number.isFinite(customLimitMs) && customLimitMs > 0;

  const openLimitEditor = () => {
    if (isSessionActive) return;

    if (hasLimit) {
      const totalMinutes = Math.floor(customLimitMs / 60000);

      setHours(Math.floor(totalMinutes / 60));
      setMinutes(totalMinutes % 60);
    } else {
      setHours(1);
      setMinutes(30);
    }

    setIsLimitOpen(true);
  };

  const applyLimit = () => {
    const totalMinutes = Number(hours) * 60 + Number(minutes);

    if (totalMinutes <= 0) return;

    onSetCustomLimit(totalMinutes * 60 * 1000);
    onSetSessionName(sessionName.trim() || "Focus Session");

    setIsLimitOpen(false);
  };

  const clearLimit = () => {
    onSetCustomLimit(null);
    setIsLimitOpen(false);
  };

  const setPreset = (totalMinutes) => {
    setHours(Math.floor(totalMinutes / 60));
    setMinutes(totalMinutes % 60);
  };

  return (
    <>
      <div className="focus-shell relative flex min-h-dvh flex-col text-slate-100">
        <div className="ambient-blob ambient-blob--one" aria-hidden="true" />
        <div className="ambient-blob ambient-blob--two" aria-hidden="true" />
        <div className="ambient-blob ambient-blob--three" aria-hidden="true" />

        <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-7 sm:px-6">
          {main}
        </main>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-[min(100vw,30rem)] overflow-y-auto border-l border-blue-200/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-6"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                className="mb-5 text-sm font-medium text-slate-400 transition hover:text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                Close
              </button>

              {sidebar}
            </div>
          </div>
        )}

        <footer className="relative z-10 flex items-center justify-between border-t border-blue-100/10 bg-slate-950/35 p-4 backdrop-blur-md">
          <a
            href="https://anuragkumar-git.github.io/anurag-portfolio/"
            target="_blank"
            rel="noreferrer"
            className="text-xl font-semibold tracking-tight text-slate-100"
          >
            Flux
          </a>

          <div className="relative flex items-center gap-2">
            {/* Session limit */}
            <button
              type="button"
              disabled={isSessionActive}
              onClick={openLimitEditor}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                hasLimit
                  ? "border-cyan-200/20 bg-cyan-300/5 text-cyan-100 hover:border-cyan-200/35 hover:bg-cyan-300/10"
                  : "border-blue-200/15 bg-blue-300/5 text-blue-100 hover:border-blue-200/30 hover:bg-blue-300/10"
              } ${isSessionActive ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {hasLimit
                ? `${formatDurationLabel(customLimitMs)} Timer`
                : "Set timer"}
            </button>

            {/* Limit popover */}
            {isLimitOpen && !isSessionActive && (
              <div className="absolute bottom-12 right-0 z-50 w-64 rounded-2xl border border-blue-100/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-100">
                    Session duration
                  </p>

                  <p className="mt-1 text-xs text-blue-100/45">
                    {/* Set a limit for this session. */}
                    Set a timer for this session.
                  </p>
                </div>

                <div className="mb-4">
                  <label className="mb-1.5 block text-xs font-medium text-blue-100/50">
                    Session name
                  </label>

                  <input
                    type="text"
                    value={sessionName}
                    maxLength={60}
                    onChange={(e) => onSetSessionName(e.target.value)}
                    placeholder="e.g. Deep Work"
                    className="w-full rounded-xl border border-blue-100/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/40"
                  />
                </div>
                {/* Custom duration */}
                <div className="flex items-center justify-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={hours}
                    onChange={(e) =>
                      setHours(
                        Math.max(0, Math.min(23, Number(e.target.value))),
                      )
                    }
                    className="w-14 rounded-xl border border-blue-100/10 bg-slate-900/80 px-2 py-2 text-center font-mono text-lg text-slate-100 outline-none transition focus:border-cyan-300/40"
                    aria-label="Hours"
                  />

                  <span className="text-lg text-blue-100/30">:</span>

                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) =>
                      setMinutes(
                        Math.max(0, Math.min(59, Number(e.target.value))),
                      )
                    }
                    className="w-14 rounded-xl border border-blue-100/10 bg-slate-900/80 px-2 py-2 text-center font-mono text-lg text-slate-100 outline-none transition focus:border-cyan-300/40"
                    aria-label="Minutes"
                  />
                </div>

                {/* Presets */}
                <div className="mt-4 grid grid-cols-4 gap-1.5">
                  {[
                    ["25m", 25],
                    ["45m", 45],
                    ["1h", 60],
                    ["2h", 120],
                  ].map(([label, value]) => (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setPreset(value)}
                      className="rounded-lg border border-blue-100/10 bg-blue-300/5 px-2 py-1.5 text-xs font-medium text-blue-100/70 transition hover:border-blue-100/20 hover:bg-blue-300/10 hover:text-blue-100"
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  {hasLimit ? (
                    <button
                      type="button"
                      onClick={clearLimit}
                      className="text-xs font-medium text-slate-500 transition hover:text-rose-300"
                    >
                      {/* Remove limit */}
                      Remove timer
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={clearLimit}
                      className="text-xs font-medium text-slate-500 transition hover:text-rose-300"
                    >
                      Close
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={applyLimit}
                    className="rounded-full border border-cyan-100/25 bg-linear-to-br from-cyan-400 to-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:from-cyan-300 hover:to-blue-500 active:scale-95"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {/* History */}
            <button
              type="button"
              className="rounded-full border border-blue-200/15 bg-blue-300/5 px-4 py-1.5 text-sm font-medium text-blue-100 transition hover:border-blue-200/30 hover:bg-blue-300/10"
              onClick={() => setIsSidebarOpen(true)}
            >
              History
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
