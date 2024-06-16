import { ReactNode } from 'react'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

import Bars3Icon from '@components/icons/Bars3'
import XMarkIcon from '@components/icons/XMark'

import ProfileImage from './ProfileImage'

interface Props {
  children?: ReactNode
}

const LoggedIn: React.FC<Props> = ({ children }) => {
  // const user = useUser()
  // const config = useConfig()
  // const avatar =
  //   'https://storage.cloud.google.com/amy-assets-main-public/user_images/oneuser.png'

  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-none">
            <div className="relative flex h-16 justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {children ? (
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                ) : null}
              </div>

              {/* Logo */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    src="/static/logos/logos-strands-ideation_square-light.svg"
                    alt="Strands Logo"
                    className="h-8 w-8"
                    width={100}
                    height={24}
                    priority
                  />
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {children}
                </div>
              </div>

              {/* Profile dropdown */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-theme-500 focus:ring-offset-2">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <ProfileImage
                        className="h-8 w-8 rounded-full border border-gray-400 dark:border-gray-600"
                        alt="Avatar"
                        width={24}
                        height={24}
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                            href="/account"
                            className={classNames(
                              'block px-4 py-2 text-sm text-gray-700',
                              { 'bg-gray-100': focus }
                            )}
                          >
                            Your Account
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                            href="/account/password/change"
                            className={classNames(
                              'block px-4 py-2 text-sm text-gray-700',
                              { 'bg-gray-100': focus }
                            )}
                          >
                            Change Password
                          </Link>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <Link
                            href="/account/logout"
                            className={classNames(
                              'block px-4 py-2 text-sm text-gray-700',
                              { 'bg-gray-100': focus }
                            )}
                          >
                            Log out
                          </Link>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 pb-4 pt-2">
              {/* Current: "bg-theme-50 border-theme-500 text-theme-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              {/* TODO REFACTOR REQUEST This should be a next link for improved performance */}
              {/* <DisclosureButton
                as="a"
                href="/account"
                className="block border-l-4 border-theme-500 bg-theme-50 py-2 pl-3 pr-4 text-base font-medium text-theme-700"
              >
                Account
              </DisclosureButton> */}
              {/* <DisclosureButton
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Team
              </DisclosureButton>
              <DisclosureButton
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Projects
              </DisclosureButton>
              <DisclosureButton
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
              >
                Calendar
              </DisclosureButton> */}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

export default LoggedIn
