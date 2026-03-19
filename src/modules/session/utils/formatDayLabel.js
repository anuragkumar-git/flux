export function formatDayLabel(dayId) {

    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const todayStr = `${day}-${month}-${year}`;

    if (dayId === todayStr) {
        return "Today"
    } else {
        const input = String(dayId)
        const [d, m, y] = input.split("-");
        const date = new Date(y, m - 1, d);

        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(/ /g, '-');
    }
}