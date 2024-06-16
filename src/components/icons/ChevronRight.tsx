import { FC } from 'react'

import classNames from 'classnames'

import { IconProps } from './_type'

/* Use for breadcrumbs
 */
const ChevronRight: FC<IconProps> = ({ className }) => (
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
      d="m8.25 4.5 7.5 7.5-7.5 7.5"
    />
  </svg>
)

export default ChevronRight
