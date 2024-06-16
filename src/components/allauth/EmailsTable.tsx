import { useState } from 'react'

import classnames from 'classnames'

import BadgeCheck from '@components/icons/BadgeCheck'
import ExclamationTriangle from '@components/icons/ExclamationTriangle'

interface Email {
  email: string
  primary: boolean
  verified: boolean
}

interface Props {
  add: (email: string) => void
  className: string
  disabled: boolean
  emails: Email[]
  markPrimary: (email: string) => void
  remove: (email: string) => void
  verify: (email: string) => void
}

const EmailsTable: React.FC<Props> = ({
  className,
  emails,
  markPrimary,
  verify,
  remove,
  add,
  disabled,
}) => {
  // TODO Add emails via a form in a modal component!
  const [open, setOpen] = useState(false)

  return (
    <div className={classnames('px-4 sm:px-6 lg:px-8', className)}>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Email Addresses
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Email addresses linked to your account. Add or remove addresses, or
            request verification from this table.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            disabled={disabled}
            onClick={() => setOpen(true)}
            type="button"
            className="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Add email
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
                    Email
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Verification status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Primary address?
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {emails.map((email) => (
                  <tr key={email.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-0">
                      <div className="flex items-center">
                        {email.email}
                        {email.primary && (
                          <span className="ml-5 inline-flex items-center rounded-md bg-primary-50/60 px-2 py-1 text-xs font-medium text-primary-700 ring-1 ring-inset ring-primary-600/20">
                            Primary
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 font-medium sm:pl-0">
                      {email.verified ? (
                        <div className="text-green-600 flex items-center">
                          <BadgeCheck />
                          <span className="ml-2">Verified</span>
                        </div>
                      ) : (
                        <div className="text-yellow-600 flex items-center">
                          <ExclamationTriangle></ExclamationTriangle>
                          <span className="ml-2">Unverified</span>
                        </div>
                      )}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      {!email.verified && (
                        <button
                          className="text-primary-600 hover:text-primary-500 disabled:text-gray-400 "
                          disabled={disabled}
                          onClick={() => verify(email.email)}
                        >
                          Verify
                        </button>
                      )}
                      <button
                        className="ml-6 text-primary-600 hover:text-primary-500 disabled:text-gray-400 "
                        disabled={disabled || email.primary || !email.verified}
                        onClick={() => markPrimary(email.email)}
                      >
                        Mark as primary
                      </button>
                      <button
                        className="ml-6 text-red-600 hover:text-red-500 disabled:text-gray-400 "
                        disabled={disabled || email.primary}
                        onClick={() => remove(email.email)}
                      >
                        Remove
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

export default EmailsTable
