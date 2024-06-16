import { FC } from 'react'

import classNames from 'classnames'
import Link from 'next/link'

interface Classes {
  action?: string
  purpose?: string
}

interface Props {
  action: string
  classes?: Classes
  href: string
  purpose: string
}

const FormLinkLine: FC<Props> = ({ classes, purpose, action, href }) => {
  const purposeClasses = classNames(
    'mt-10 text-center text-sm text-gray-600 dark:text-gray-400',
    classes?.purpose
  )
  const actionClasses = classNames(
    'font-semibold leading-6 text-primary-600 hover:text-primary dark:text-primary-300 dark:hover:text-primary-300',
    classes?.action
  )
  return (
    <p className={purposeClasses}>
      {purpose}{' '}
      <Link href={href} className={actionClasses}>
        {action}
      </Link>
    </p>
  )
}

export default FormLinkLine
