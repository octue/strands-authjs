import React, { FC } from 'react'

import classNames from 'classnames'

import { ButtonProps } from './Button'

const PaleButton: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  onClick,
  type,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        'bg-none flex justify-center items-center rounded-md px-6 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ',
        className,
        'text-gray-600 hover:bg-gray-100 focus-visible:outline-gray-400',
        'dark:text-white dark:hover:bg-transparent-white dark:focus-visible:outline-white'
      )}
    >
      {children}
    </button>
  )
}

export default PaleButton
