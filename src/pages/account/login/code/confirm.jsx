import { useState } from 'react'

import { useRouter } from 'next/router'

import { useAuthStatus } from '@allauth/hooks'
import { Flows, confirmLoginCode } from '@allauth/lib/allauth'
import { AnonymousRoute } from '@allauth/routing'

import Button from '@components/buttons/Button'
import FormErrors from '@components/forms/FormErrors'

// TODO REFACTOR REQUEST Style this page, use tsx and use RHF

function LoginCodeConfirm() {
  const [, authInfo] = useAuthStatus()
  const router = useRouter()
  const [code, setCode] = useState('')

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(null)

  const handleConfirmLoginCode = () => {
    setLoading(true)
    confirmLoginCode(code)
      .then(setContent)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  if (authInfo.pendingFlow?.id !== Flows.LOGIN_BY_CODE) {
    router.push('/account/login/code')
    return null
  }
  return (
    <div>
      <h1>Enter Sign-In Code </h1>
      <p>The code expires shortly, so please enter it soon.</p>

      <FormErrors errors={content?.errors} />

      <div>
        <label>
          Code{' '}
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            type="code"
            required
          />
        </label>
        <FormErrors param="code" errors={content?.errors} />
      </div>
      <Button disabled={loading} onClick={handleConfirmLoginCode}>
        Sign In
      </Button>
    </div>
  )
}

/* TODO REFACTOR REQUEST Anonymous pages should be routed using next middleware
 * See _app.tsx
 */
export default function AnonymousLoginCodeConfirm({ ...pageProps }) {
  return (
    <AnonymousRoute>
      <LoginCodeConfirm {...pageProps} />
    </AnonymousRoute>
  )
}
