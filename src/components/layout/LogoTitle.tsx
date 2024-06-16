import { FC } from 'react'

import classNames from 'classnames'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  className?: string
  subtitle?: string
  title: string
}

const LogoTitle: FC<Props> = ({ className, title, subtitle = null }) => {
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
      <div className="inline-block mr-7 pr-[23px] border-r border-gray-700 dark:border-transparent-white">
        <Link href="/">
          <Image
            src="/static/logos/logos-strands-ideation_square-light.svg"
            alt="Strands Logo"
            className="h-14 w-14"
            width={100}
            height={24}
            priority
          />
        </Link>
      </div>
      <div className="flex flex-col">
        <h1 className="inline-block leading-[48px] text-2xl font-medium">
          {title}
        </h1>
        <h2 className="-mt-1.5 inline-block text-xs font-normal leading-7">
          {subtitle}
        </h2>
      </div>
    </div>
  )
}

export default LogoTitle
