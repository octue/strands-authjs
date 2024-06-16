import React, { forwardRef } from 'react'

import classNames from 'classnames'

import ExclamationCircleIcon from '@components/icons/ExclamationCircle'

import Input from './Input'

interface Classes {
  label?: string
  text?: string
  input?: string
}

export interface InputGroupProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  label?: string
  help?: string
  error?: string
  classes?: Classes
  trailingIcon?: React.ReactNode
}

export type Ref = HTMLInputElement

const InputGroup = forwardRef<Ref, InputGroupProps>((props, ref) => {
  const {
    id,
    className,
    classes,
    label,
    trailingIcon,
    help,
    error,
    children,
    ...rest
  } = props

  const hasError = !!error
  const hasTrailingIcon = !!trailingIcon && !hasError
  const hasHelpOrError = !!help || hasError

  const labelClasses = classNames(
    'block text-sm font-medium leading-6',
    {
      ['text-gray-900 dark:text-white']: !hasError,
      ['text-red-500 dark:text-red-400']: hasError,
    },
    classes?.label
  )

  const textClasses = classNames(
    'ml-2 mt-2 text-sm',
    {
      ['text-gray-500 dark:text-white/50']: !hasError,
      ['text-red-500 dark:text-red-400/80']: hasError,
    },
    classes?.text
  )

  return (
    <div className={className}>
      {children ? (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
          {children}
        </div>
      ) : (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
        <Input
          {...rest}
          ref={ref}
          className={classes?.input}
          id={id}
          hasError={hasError}
        />
        {hasError && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500 dark:text-red-400"
              aria-hidden="true"
            />
          </div>
        )}
        {hasTrailingIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {trailingIcon}
          </div>
        )}
      </div>
      {hasHelpOrError && (
        <p
          className={textClasses}
          id={`${id}-${hasError ? 'error' : 'description'}`}
        >
          {error || help || null}
        </p>
      )}
    </div>
  )
})

InputGroup.displayName = 'InputGroup'

export default InputGroup
