import { useState } from 'react'

import { useRouter } from 'next/router'

import { requestLoginCode } from '@allauth/lib/allauth'
import { AnonymousRoute } from '@allauth/routing'

import Button from '@components/buttons/Button'
import FormErrors from '@components/forms/FormErrors'

// TODO REFACTOR REQUEST Style this page, use tsx and use RHF

function LoginCode() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(null)

  const handleSubmit = () => {
    setLoading(true)
    requestLoginCode(email)
      .then(setContent)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  if (content?.status === 401) {
    router.push('/account/login/code/confirm')
    return null
  }

  return (
    <div>
      <h1>Mail me a sign-in code</h1>
      <p>
        You will receive an email containing a special code for a password-free
        sign-in.
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
      <Button disabled={loading} onClick={handleSubmit}>
        Request Code
      </Button>
    </div>
  )
}

/* TODO REFACTOR REQUEST Anonymous pages should be routed using next middleware
 * See _app.tsx
 */
export default function AnonymousLoginCode({ ...pageProps }) {
  return (
    <AnonymousRoute>
      <LoginCode {...pageProps} />
    </AnonymousRoute>
  )
}
