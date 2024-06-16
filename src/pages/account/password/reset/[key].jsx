import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { resetPassword } from '@allauth/lib/allauth'
import { AnonymousRoute } from '@allauth/routing'

import Button from '@components/buttons/Button'
import FormErrors, { filterFormErrors } from '@components/forms/FormErrors'

// TODO REFACTOR REQUEST Style this page, use tsx and use RHF

function PasswordResetKey() {
  const router = useRouter()
  const { key } = router.query
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(null)

  function submit() {
    setLoading(true)
    resetPassword(password, key)
      .then(setContent)
      .catch((e) => {
        // TODO Display toast to show something went wrong
        console.error(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  if ([200, 401].includes(content?.status)) {
    router.push('/account/login')
  }
  const keyErrors = filterFormErrors(content?.errors, 'key')
  const hasKeyErrors = keyErrors.length > 0

  const keyErrorsMessage = (
    <p>
      Your reset code is invalid or expired{' '}
      <Link href="/account/password/reset">Click here to try again.</Link>
    </p>
  )
  const newPasswordForm = (
    <>
      <p>
        Remember your password?{' '}
        <Link href="/account/login">Back to login.</Link>
      </p>
      <div>
        <label>
          Password:{' '}
          <input
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </label>
        <FormErrors param="password" errors={content?.errors} />
      </div>
      <Button disabled={loading} onClick={submit}>
        Reset
      </Button>
    </>
  )
  return (
    <div>
      <h1>Reset Password</h1>
      {hasKeyErrors ? keyErrorsMessage : newPasswordForm}
    </div>
  )
}

// TODO Either use server side props, or an initial fetch, to determine if the key
// import { getPasswordReset, resetPassword } from '@allauth/lib/allauth'
// is valid prior to asking user for their new password.
// export async function getServerSideProps(context) {
//     const key = context.params.key
//     const resp = await getPasswordReset(key)
//     return { props: { key, keyResponse: resp } }
//   }

/* TODO REFACTOR REQUEST Anonymous pages should be routed using next middleware
 * See _app.tsx
 */
export default function AnonymousPasswordResetKey({ ...pageProps }) {
  return (
    <AnonymousRoute>
      <PasswordResetKey {...pageProps} />
    </AnonymousRoute>
  )
}
