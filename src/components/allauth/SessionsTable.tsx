import classnames from 'classnames'

import BadgeCheck from '@components/icons/BadgeCheck'

interface Session {
  is_current: boolean
  created_at: string
  ip: string
  user_agent: string
  last_seen_at: string
}

interface Props {
  className: string
  currentSession: Session
  otherSessions: Session[]
  endSessions: (sessions: Session[]) => void
  trackActivity: boolean
  disabled: boolean
}

const SessionsTable: React.FC<Props> = ({
  className,
  currentSession,
  otherSessions,
  endSessions,
  trackActivity,
  disabled,
}) => {
  const sessions = [currentSession, ...otherSessions]

  return (
    <div className={classnames('px-4 sm:px-6 lg:px-8 bg-white', className)}>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Current sessions
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            All the places you are signed in. You can use this table to log out
            of other computers remotely.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            disabled={disabled || otherSessions.length <= 1}
            onClick={() => endSessions(otherSessions)}
            type="button"
            className="block rounded-md bg-theme-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-theme-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-600"
          >
            Log out all other sessions
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Current
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Login time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    IP address
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Browser
                  </th>
                  {trackActivity && (
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Last seen
                    </th>
                  )}
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sessions.map((session) => (
                  <tr key={session.created_at}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-theme-600 sm:pl-0">
                      {session.is_current ? <BadgeCheck></BadgeCheck> : ''}
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0">
                      {new Date(session.created_at * 1000).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {session.ip}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {session.user_agent}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(session.last_seen_at * 1000).toLocaleString()}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <button
                        className="text-theme-600 hover:text-theme-800 disabled:text-gray-400"
                        disabled={disabled}
                        onClick={() => endSessions([session])}
                      >
                        Log out
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionsTable
