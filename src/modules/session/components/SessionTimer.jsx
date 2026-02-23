import { fomatTime } from "../utils/formatTime";

export default function SessionTimer({ session, elapsed }) {
  const status = session?.status || "idle";

  return (
    <>
      <div className="bg-white rounded-xl shadow p-6 text-center space-y-6">
        <p className="text-sm uppercase tracking-wide text-gray-500">
          {status}
        </p>

        <h2 className="text-4xl font-mono font-bold">{fomatTime(elapsed)}</h2>
      </div>
    </>
  );
}
