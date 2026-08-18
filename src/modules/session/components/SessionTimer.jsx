import { useEffect, useState } from "react";
import { formatTime } from "../utils/formatTime";

const statusLabel = {
  idle: "Ready when you are",
  running: "Focus session active",
  pause: "Session paused",
  ended: "Session complete",
};

export default function SessionTimer({
  session,
  elapsed,
  dailySummary,
  onUpdateDescription,
}) {
  const status = session?.status ?? "idle";
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(
    session?.description ?? "Focus Session",
  );

  const hasLimit =
    Number.isFinite(session?.customLimitMs) && session.customLimitMs > 0;

  const limit = hasLimit ? session.customLimitMs : null;

  const displayTime =
    status === "ended" ? 0 : hasLimit ? Math.max(0, limit - elapsed) : elapsed;

  const displayName =
    status === "ended"
      ? "Focus Session"
      : session?.description || "Focus Session";

  const saveName = async () => {
    const name = nameDraft.trim();

    if (!name) {
      setNameDraft(session?.description ?? "Focus Session");
      return;
    }

    await onUpdateDescription(name);
    setIsEditingName(false);
  };

  useEffect(() => {
    setNameDraft(session?.description ?? "Focus Session");
  }, [session?.description]);

  return (
    <section className="liquid-timer" aria-label="Current focus session">
      <div
      // className={`liquid-orb liquid-orb--${status}`}
      // style={{ "--fill-level": `${progress * 100}%` }}
      >
        {/* <div className="liquid-orb__aura" aria-hidden="true" /> */}
        <div className="liquid-orb__fill" aria-hidden="true">
          <span className="liquid-orb__wave liquid-orb__wave--one" />
          <span className="liquid-orb__wave liquid-orb__wave--two" />
          <span className="liquid-orb__wave liquid-orb__wave--three" />
        </div>
        {/* <div className="liquid-orb__highlight" aria-hidden="true" /> */}

        <div className="liquid-orb__content">
          {/* <p className="liquid-orb__status">{statusLabel[status]}</p> */}
          {session?.description && (
            <div className=" flex flex-col items-center">
              {status === "pause" && isEditingName ? (
                <input
                  autoFocus
                  type="text"
                  maxLength={60}
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  onBlur={saveName}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      saveName();
                    }

                    if (e.key === "Escape") {
                      setNameDraft(session.description);
                      setIsEditingName(false);
                    }
                  }}
                  className="w-48 rounded-lg border border-blue-200/15 bg-slate-950/60 px-2 py-1 text-center text-sm text-slate-100 outline-none focus:border-cyan-300/40"
                  aria-label="Edit session name"
                />
              ) : (
                <button
                  type="button"
                  disabled={status !== "pause"}
                  onClick={() => {
                    if (status === "pause") {
                      setIsEditingName(true);
                    }
                  }}
                  className={`text-sm font-medium transition ${
                    status === "pause"
                      ? "text-blue-100/80 hover:text-cyan-200"
                      : "cursor-default text-blue-100/75"
                  }`}
                >
                  {displayName}
                </button>
              )}

              {status === "pause" && !isEditingName && (
                <span className="mt-0.5 text-[10px] text-blue-100/35">
                  Tap name to edit
                </span>
              )}

              {status === "running" && (
                <span className="mt-0.5 text-[10px] text-blue-100/30">
                  Pause to edit session name
                </span>
              )}
            </div>
          )}
          <time
            className="liquid-orb__time"
            // aria-label={
            //   hasLimit
            //     ? `Time remaining ${formatTime(displayTime)}`
            //     : `Session time ${formatTime(displayTime)}`
            // }
          >
            {formatTime(displayTime)}
          </time>

          <p className="liquid-orb__caption">
            {status === "pause" ?? "Paused ·"} Focus time (Today){" "}
            {formatTime(dailySummary?.totalDuration ?? 0)}
          </p>
        </div>
      </div>
    </section>
  );
}
