import Link from 'next/link'

import ChevronRightIcon from '@components/icons/ChevronRight'
import HomeIcon from '@components/icons/Home'

export interface Breadcrumb {
  name: string
  href: string
}
interface BreadcrumbsProps {
  crumbs: Breadcrumb[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs = [] }) => {
  // Adds aria-current='page' prop to the link
  const withCurrent = crumbs.map((item, idx) => ({
    ...item,
    current: idx == crumbs.length - 1,
  }))

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {withCurrent.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={page.href}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
