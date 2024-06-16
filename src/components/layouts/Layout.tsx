import React from 'react'

import classNames from 'classnames'

import NavBar from '@components/navbar/NavBar'

interface Classes {
  header?: string
  main?: string
  footer?: string
}

interface Props {
  children?: React.ReactNode
  classes?: Classes
  dark?: boolean
}

const Layout: React.FC<Props> = ({ children, classes, dark }) => {
  return (
    <div
      className={classNames({
        'dark bg-black': dark,
        'bg-white': !dark,
      })}
    >
      <header className={classes?.header}>
        <NavBar />
      </header>
      <main className={classes?.main}>{children}</main>
      <footer className={classes?.footer}>{/* Footer content */}</footer>
    </div>
  )
}

export default Layout
