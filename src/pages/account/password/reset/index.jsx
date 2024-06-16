import { useState } from 'react'

import Link from 'next/link'

import { requestPasswordReset } from '@allauth/lib/allauth'
import { AnonymousRoute } from '@allauth/routing'

import Button from '@components/buttons/Button'
import FormErrors from '@components/forms/FormErrors'

// TODO REFACTOR REQUEST Style this page, use tsx and use RHF

function PasswordReset() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(null)

  const handleReset = () => {
    setLoading(true)
    requestPasswordReset(email)
      .then(setContent)
      .catch((e) => {
        console.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (content?.status === 200) {
    return (
      <div>
        <h1>Reset Password</h1>
        <p>Password reset sent.</p>
        <Link href="/account/login/">Return to login</Link>
      </div>
    )
  }
  return (
    <div>
      <h1>Reset Password</h1>
      <p>
        Remember your password? <Link href="/account/login">Log in here.</Link>
      </p>

      <FormErrors errors={content?.errors} />

      <div>
        <label>
          Email{' '}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
        </label>
        <FormErrors param="email" errors={content?.errors} />
      </div>
      <Button disabled={loading} onClick={handleReset}>
        Reset
      </Button>
    </div>
  )
}

/* TODO REFACTOR REQUEST Anonymous pages should be routed using next middleware
 * See _app.tsx
 */
export default function AnonymousPasswordReset({ ...pageProps }) {
  return (
    <AnonymousRoute>
      <PasswordReset {...pageProps} />
    </AnonymousRoute>
  )
}
