import React, { useCallback, useEffect, useState } from 'react'
import { sessionService } from '../../../services/sessionService'

export default function useSession() {
    const [session, setSession] = useState(null)
    const [elapsed, setElapsed] = useState(0)
    const [dailySummary, setDailySummary] = useState(null)
    const [showDecsriptionInput, setShowDecsriptionInput] = useState(false)
    const [pendingEndReason, setPendingEndReason] = useState(null)

    const refresh = useCallback(
        async () => {
            const current = await sessionService.getCurrentSession()
            setSession(current)

            if (current && current.status === "ended") {
                setElapsed(sessionService.getElapsedTime())
            }

            const todayId = sessionService.getDayIdFromTimeStemp(Date.now())
            const summary = await sessionService.getDailySummary(todayId)
            setDailySummary(summary)
        }, []
    )

    useEffect(() => {
        refresh()
        const interval = setInterval(refresh, 800);
        return () => clearInterval(interval)
    }, [refresh])

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
        const ended = await sessionService.end(pendingEndReason)
        ended.description = description || "Untitled Session"
        setShowDecsriptionInput(false)
        setPendingEndReason(null)
        refresh()
    }

    return {
        session,
        elapsed,
        dailySummary,
        showDecsriptionInput,
        start, pause, resume, requestEnd, confirmEnd
    }
}
