import { FC } from 'react'

import classNames from 'classnames'

import { IconProps } from './_type'

/* Use to indicate a return to what you were doing previously
 * (eg change your mind about logging out)
 */
const Return: FC<IconProps> = ({ className }) => (
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
      d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    />
  </svg>
)
export default Return
