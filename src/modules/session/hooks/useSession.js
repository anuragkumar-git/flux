import React, { useCallback, useEffect, useState } from 'react'
import { sessionService } from '../../../services/sessionService'

export function useSession() {
    const [session, setSession] = useState(null)
    const [elapsed, setElapsed] = useState(0)
    const [dailySummary, setDailySummary] = useState(null)
    const [showDecsriptionInput, setShowDecsriptionInput] = useState(false)
    const [pendingEndReason, setPendingEndReason] = useState(null)
    const [allDaysHistory, setAllDaysHistory] = useState([])

    const refresh = useCallback(
        async () => {

            const current = await sessionService.getCurrentSession()
            setSession(current)
            // if (current && current?.status === "ended") {
            //     setElapsed(sessionService.getElapsedTime())
            //     // setElapsed(0)
            // } else {
            //     setElapsed(sessionService.getElapsedTime())
            // }
            setElapsed(sessionService.getElapsedTime())

            const todayId = sessionService.getDayIdFromTimeStemp(Date.now())
            const summary = await sessionService.getDailySummary(todayId)
            setDailySummary(summary)
            const grouped = await sessionService.getAllDaysWithSessions()
            setAllDaysHistory(grouped)
        }, []
    )

    useEffect(() => {
        refresh()
        const interval = setInterval(refresh, 1000);
        return () => clearInterval(interval)
    }, [])

    const start = () => {
        sessionService.start("Untiteld Session")
        refresh()
    }

    const pause = () => {
        sessionService.pause();
        refresh()
    }

    const resume = () => {
        sessionService.resume()
        refresh()
    }

    const requestEnd = (reason = "manual") => {
        setPendingEndReason(reason)
        setShowDecsriptionInput(true)
    }

    const confirmEnd = async (description) => {
        await sessionService.end({
            reason: pendingEndReason,
            description
        })
        setShowDecsriptionInput(false)
        setPendingEndReason(null)
        refresh()
    }

    const end = async () => {
        await sessionService.end()
    }
    return {
        session,
        elapsed,
        dailySummary,
        showDecsriptionInput,
        allDaysHistory,
        start, pause, resume, end, requestEnd, confirmEnd
    }
}
