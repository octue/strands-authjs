import { FC } from 'react'

import classNames from 'classnames'
import { FieldError } from 'react-hook-form'

interface Props {
  error?: FieldError
  className: string
}

const ErrorBox: FC<Props> = ({ className, error }) => {
  const classes = classNames(
    'list-none w-full text-white bg-red-600 dark:bg-red-400 rounded p-2',
    className
  )

  return error ? <div className={classes}>{error.message}</div> : null
}

export default ErrorBox
