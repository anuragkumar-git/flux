export function formatDurationLabel(ms) {
  const totalMinutes = Math.floor((Number(ms) || 0) / 60000);

  if (totalMinutes <= 0) {
    return "Let's start";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} hr ${minutes} min`;
  }

  if (hours > 0) {
    return `${hours} hr`;
  }

  return `${minutes} min`;
}