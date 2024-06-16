import { useEffect, useState } from 'react'

import { useConfig } from '@allauth/hooks'
import { endSessions, getSessions } from '@allauth/lib/allauth'

import SessionsTable from '@components/allauth/SessionsTable'

// TODO REFACTOR REQUEST Convert to typescript and use RHF form handler

function Sessions() {
  const config = useConfig()
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getSessions()
      .then((resp) => {
        if (resp.status === 200) {
          setSessions(resp.data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [setLoading, setSessions])

  const otherSessions = sessions.filter((session) => !session.is_current)
  const currentSession = sessions.filter((session) => session.is_current)[0]

  const handleEndSessions = (sessions) => {
    setLoading(true)
    endSessions(sessions.map((s) => s.id))
      .then((resp) => {
        setSessions(resp.data)
      })
      .catch(console.error)
      .then(() => setLoading(false))
  }

  if (currentSession) {
    return (
      <SessionsTable
        currentSession={currentSession}
        otherSessions={otherSessions}
        endSessions={handleEndSessions}
        trackActivity={config.data.usersessions.track_activity}
        disabled={loading}
      />
    )
  }
  return <p> loading sessions</p>
}

export default Sessions
