import { FC } from 'react'

import classNames from 'classnames'
import Head from 'next/head'

interface Props {
  title: string
  subtitle: string
  className?: string
}

const BarTitle: FC<Props> = ({ className, title, subtitle }) => {
  return (
    <div
      className={classNames(
        'mb-8 flex items-center  text-gray-700 dark:text-white',
        className
      )}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="inline-block mr-5 leading-[48px] pr-[23px] text-xl font-medium border-r border-gray-700 dark:border-transparent-white">
        {title}
      </h1>
      <h2 className="inline-block text-sm font-normal leading-7">{subtitle}</h2>
    </div>
  )
}

export default BarTitle
