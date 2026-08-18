export function formatDayLabel(dayId) {

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const todayStr = `${year}-${month}-${day}`;

    if (dayId === todayStr) {
        return "Today"
    } else {
        const input = String(dayId)
        const parts = input.split("-");
        const [y, m, d] = parts[0].length === 4
            ? parts
            : [parts[2], parts[1], parts[0]];
        const date = new Date(y, m - 1, d);

        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, '-');
    }
}
