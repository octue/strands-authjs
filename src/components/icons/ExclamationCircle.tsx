import { FC } from 'react'

import classNames from 'classnames'

import { IconProps } from './_type'

/* Use to highlight an error, eg as trailing icon in a form field
 */
const ExclamationCircle: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={classNames('size-6', className)}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
    />
  </svg>
)

export default ExclamationCircle
