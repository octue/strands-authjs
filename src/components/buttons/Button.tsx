import React, { ButtonHTMLAttributes, FC } from 'react'

import classNames from 'classnames'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({
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
        'text-white flex justify-center items-center rounded-md px-6 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'bg-primary-600 border-primary-600 hover:bg-primary-500 focus-visible:outline-primary-600',
        'dark:bg-primary-500 dark:border-primary-500 dark:hover:bg-primary-400 dark:focus-visible:outline-primary-500',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
