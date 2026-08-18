import { useCallback, useEffect, useRef, useState } from "react";
import { sessionService } from "../../../services/sessionService";

export function useSession() {
    const [session, setSession] = useState(null);
    const [elapsed, setElapsed] = useState(0);
    const [dailySummary, setDailySummary] = useState(null);
    const [allDaysHistory, setAllDaysHistory] = useState([]);
    const [error, setError] = useState(null);
    const refreshing = useRef(false);

    const refresh = useCallback(async () => {
        if (refreshing.current) return;

        refreshing.current = true;
        try {
            const current = await sessionService.getCurrentSession();
            const todayId = sessionService.getDayIdFromTimestamp(Date.now());
            const [summary, grouped] = await Promise.all([
                sessionService.getDailySummary(todayId),
                sessionService.getAllDaysWithSessions(),
            ]);

            setSession(current);
            setElapsed(sessionService.getElapsedTime());
            setDailySummary(summary);
            setAllDaysHistory(grouped);
            setError(null);
        } catch (refreshError) {
            setError(refreshError);
        } finally {
            refreshing.current = false;
        }
    }, []);

    useEffect(() => {
        refresh();
        const interval = setInterval(refresh, 1000);
        return () => clearInterval(interval);
    }, [refresh]);

    const runAction = useCallback(async (action) => {
        try {
            await action();
            await refresh();
        } catch (actionError) {
            setError(actionError);
        }
    }, [refresh]);

    const start = useCallback(
        (description = "Focus Session", customLimitMs = null) =>
            runAction(() =>
                sessionService.start(description, customLimitMs)
            ),
        [runAction]
    );

    const pause = useCallback(() => runAction(() => sessionService.pause()), [runAction]);
    const resume = useCallback(() => runAction(() => sessionService.resume()), [runAction]);
    const end = useCallback(() => runAction(() => sessionService.end()), [runAction]);

    const updateDescription = useCallback(
        async (id, description) => {
            await runAction(() => sessionService.updateDescription(id, description));
        },
        [runAction]
    );

    const updateCurrentDescription = useCallback(
        async (description) => {
            await runAction(() =>
                sessionService.updateCurrentDescription(description)
            );
        },
        [runAction]
    );

    const clearHistory = useCallback(async () => {
        if (!window.confirm("Clear all completed session history? This cannot be undone.")) {
            return;
        }
        await runAction(() => sessionService.clearHistory());
    }, [runAction]);

    return {
        session,
        elapsed,
        dailySummary,
        allDaysHistory,
        error,
        start,
        pause,
        resume,
        end,
        refresh,
        updateDescription,
        updateCurrentDescription,
        clearHistory,
    };
}
