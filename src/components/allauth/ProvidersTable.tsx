import classnames from 'classnames'

import Button from '@components/buttons/Button'

interface Props {
  className?: string
}

const ProvidersTable: React.FC<Props> = ({ className }) => {
  return (
    <div className={classnames('px-4 sm:px-6 lg:px-8 bg-white', className)}>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Social Auth Providers
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            There are no providers configured at this time. Coming soon!
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button disabled>Add provider</Button>
        </div>
      </div>
    </div>
  )
}

export default ProvidersTable
