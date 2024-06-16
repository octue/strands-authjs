import getDarkModifiers from '@styles/getDarkModifiers'

import React, { forwardRef } from 'react'

import classNames from 'classnames'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  hasError?: boolean
}

export type Ref = HTMLInputElement

export const baseClasses =
  'bg-white/5 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'

export const primaryClasses = classNames(
  'text-gray-900      fill-gray-900        ring-gray-300      placeholder:text-gray-400      focus:ring-primary-600',
  'dark:text-white/90 dark:fill-white dark:ring-white/30 dark:placeholder:text-white/30 dark:focus:ring-primary-400'
)
export const primaryErrorClasses = classNames(
  '     text-red-700      fill-red-700      ring-red-300      placeholder:text-red-300      focus:ring-red-500  ',
  'dark:text-red-400 dark:fill-red-400 dark:ring-red-400 dark:placeholder:text-red-300 dark:focus:ring-red-400 dark:focus:fill-red-400 dark:focus:text-red-400'
)

const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const { className, hasError, ...rest } = props

  const classes = classNames(
    baseClasses,
    {
      [primaryClasses]: !hasError,
      [primaryErrorClasses]: hasError,
    },
    className
  )

  return <input ref={ref} {...rest} className={classes} />
})

Input.displayName = 'Input'

export default Input
