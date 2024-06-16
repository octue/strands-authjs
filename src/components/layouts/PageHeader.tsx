import React, { ReactNode } from 'react'

import classNames from 'classnames'
import Head from 'next/head'

import { IconProps } from '@components/icons/_type'
import Breadcrumbs, { Breadcrumb } from '@components/layouts/Breadcrumbs'

interface Icon {
  text: string
  Component: React.FC<IconProps>
}

interface Props {
  children: ReactNode
  icons?: Icon[]
  title: string
  className?: string
  divider?: boolean
  crumbs?: Breadcrumb[]
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const PageHeader: React.FC<Props> = ({
  title,
  children,
  className,
  icons = [],
  crumbs,
  divider = false,
  as = 'h1',
}) => {
  const Heading = as
  const headingClasses = classNames(
    'mt-4 text-gray-900 sm:truncate sm:tracking-tight',
    {
      'text-2xl sm:text-3xl font-bold leading-7': as === 'h1',
      'pl-4 text-xl sm:text-2xl font-bold leading-5': as !== 'h1',
    }
  )
  return (
    <div
      className={classNames(
        'pt-6 px-4 sm:px-0 lg:flex lg:items-center lg:justify-between',
        { 'border-b border-gray-300 pb-3': divider },
        className
      )}
    >
      <div className="min-w-0 flex-1">
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        {as === 'h1' && (
          <Head>
            <title>{title}</title>
          </Head>
        )}
        <Heading className={headingClasses}>{title}</Heading>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          {icons.map((icon) => (
            <div
              key={icon.text}
              className="mt-2 flex items-center text-sm text-gray-500"
            >
              <icon.Component
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              {icon.text}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0 text-gray">{children}</div>
    </div>
  )
}

export default PageHeader
