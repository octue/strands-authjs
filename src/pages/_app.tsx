import '@/styles/globals.css'

import type { AppProps } from 'next/app'

import { AuthContextProvider } from '@allauth/AuthContext'
import { AuthChangeRedirector } from '@allauth/routing'

/*
  TODO REFACTOR REQUEST The AuthChangeRedirector should be implemented with next middleware:
  https://nextjs.org/docs/pages/building-your-application/authentication#protecting-routes-with-middleware
*/

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AuthChangeRedirector>
        <Component {...pageProps} />
      </AuthChangeRedirector>
    </AuthContextProvider>
  )
}
