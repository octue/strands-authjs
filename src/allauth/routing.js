import { useRouter } from 'next/router'

import { AuthChangeEvent, useAuthChange, useAuthStatus } from './hooks'
import { Flows } from './lib/allauth'

export const URLs = Object.freeze({
  LOGIN_URL: '/account/login',
  LOGIN_REDIRECT_URL: '/',
  LOGOUT_REDIRECT_URL: '/',
})

const flow2path = {
  [Flows.LOGIN]: '/account/login',
  [Flows.LOGIN_BY_CODE]: '/account/login/code/confirm',
  [Flows.SIGNUP]: '/account/signup',
  [Flows.VERIFY_EMAIL]: '/account/verify-email',
  [Flows.PROVIDER_SIGNUP]: '/account/provider/signup',
  [Flows.MFA_AUTHENTICATE]: '/account/2fa/authenticate',
  [Flows.REAUTHENTICATE]: '/account/reauthenticate',
  [Flows.MFA_REAUTHENTICATE]: '/account/2fa/reauthenticate',
}

export function pathForFlow(flowId) {
  const path = flow2path[flowId]
  if (!path) {
    throw new Error(`Unknown path for flow: ${flowId}`)
  }
  return path
}

export function pathForPendingFlow(auth) {
  const flow = auth.data.flows.find((flow) => flow.is_pending)
  if (flow) {
    return pathForFlow(flow.id)
  }
  return null
}

export function AuthenticatedRoute({ children }) {
  const router = useRouter()
  const [, status] = useAuthStatus()
  const next = `next=${encodeURIComponent(router.asPath)}`
  if (status.isAuthenticated) {
    return children
  } else {
    router.push(`${URLs.LOGIN_URL}?${next}`)
  }
}

export function AnonymousRoute({ children }) {
  const [, status] = useAuthStatus()
  const router = useRouter()
  if (!status.isAuthenticated) {
    return children
  } else {
    router.push(URLs.LOGIN_REDIRECT_URL)
  }
}

export function AuthChangeRedirector({ children }) {
  const [auth, event] = useAuthChange()
  const router = useRouter()
  switch (event) {
    case AuthChangeEvent.LOGGED_OUT:
      router.push(URLs.LOGOUT_REDIRECT_URL)
      return null
    case AuthChangeEvent.LOGGED_IN:
      router.push(URLs.LOGIN_REDIRECT_URL)
      return null
    case AuthChangeEvent.REAUTHENTICATED: {
      const next = new URLSearchParams(router.query).get('next') || '/'
      router.push(next)
      return null
    }
    case AuthChangeEvent.REAUTHENTICATION_REQUIRED: {
      const next = `next=${encodeURIComponent(router.asPath)}`
      console.log(
        'AUTH, EVENT, wtf??',
        auth,
        event,
        AuthChangeEvent.REAUTHENTICATION_REQUIRED
      )
      if (auth?.data?.flows) {
        // escape hatch to prevent random errors all the time
        const path = pathForFlow(auth.data.flows[0].id)
        // TODO PASS THE FLOW STATE THE THE NEW VIEW PER THE EAMPLE APP
        router.push(`${path}?${next}`)
        return null
      }
    }
    case AuthChangeEvent.FLOW_UPDATED:
      const path = pathForPendingFlow(auth)
      if (path) {
        router.push(path)
        return null
      } else {
        console.error('AUTH ERROR', auth)
        throw new Error()
      }
    default:
      break
  }
  // ...stay where we are
  return children
}
