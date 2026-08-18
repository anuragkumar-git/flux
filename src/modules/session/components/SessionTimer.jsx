import { formatTime } from "../utils/formatTime";

const statusLabel = {
  idle: "Ready when you are",
  running: "Focus session active",
  pause: "Session paused",
  ended: "Session complete",
};

export default function SessionTimer({ session, elapsed, dailySummary }) {
  const status = session?.status ?? "idle";
  const limit = session?.customLimitMs ?? 0;
  const rawProgress = limit > 0 ? elapsed / limit : 0;
  const progress = status === "idle" ? 0 : Math.min(Math.max(rawProgress, 0.035), 1);

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
          <time className="liquid-orb__time" aria-label={`Session time ${formatTime(elapsed)}`}>
            {formatTime(elapsed)}
          </time>
          <p className="liquid-orb__caption">Today · {formatTime(dailySummary?.totalDuration ?? 0)}</p>
        </div>
      </div>
    </section>
  );
}
