import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { getEmailVerification, verifyEmail } from '@allauth/lib/allauth'

import Button from '@components/buttons/Button'

export async function loader({ params }) {
  const key = params.key
  const resp = await getEmailVerification(key)
  return { key, verification: resp }
}

export default function VerifyEmail() {
  const router = useRouter()
  const { key } = router.query
  const [verifying, setVerifying] = useState(true)
  const [verification, setVerification] = useState()

  useEffect(() => {
    setVerifying(true)
    getEmailVerification(key)
      .then(setVerification)
      .catch(console.error)
      .finally(() => setVerifying(false))
  }, [key, setVerification])

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(null)

  const handleVerifyEmail = () => {
    setLoading(true)
    verifyEmail(key)
      .then(setContent)
      .catch(console.error)
      .finally(() => setLoading(false))
  }

  if ([200, 401].includes(content?.status)) {
    router.push('/account/email')
    return null
  }
  let body = null
  if (verifying) {
    ;<p>Verifying your email address...</p>
  } else if (verification.status === 200) {
    body = (
      <>
        <p>
          Please confirm that{' '}
          <a href={'mailto:' + verification.data.email}>
            {verification.data.email}
          </a>{' '}
          is an email address for user &quot;{verification.data.user.username}
          &quot;.
        </p>
        <Button disabled={loading} onClick={handleVerifyEmail}>
          Confirm
        </Button>
      </>
    )
  } else if (!verification.data?.email) {
    body = <p>Invalid verification link.</p>
  } else {
    body = (
      <p>
        Email{' '}
        <a href={'mailto:' + verification.data.email}>
          {verification.data.email}
        </a>{' '}
        is already confirmed.
      </p>
    )
  }
  return (
    <div>
      <h1>Confirm your email address</h1>
      {body}
    </div>
  )
}
