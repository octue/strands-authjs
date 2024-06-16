import { FC } from 'react'

import Link from 'next/link'

const LoggedOut: FC = () => {
  return (
    <nav
      className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div className="flex lg:flex-1">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Strands</span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-end gap-x-6">
        <Link
          href="/account/login/"
          className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-50"
        >
          Log in <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link
          href="/account/signup/"
          className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Sign up
        </Link>
      </div>
    </nav>
  )
}
export default LoggedOut
