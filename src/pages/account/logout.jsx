import { useState } from 'react'

import { useRouter } from 'next/router'

import { logout } from '@allauth/lib/allauth'

import Button from '@components/buttons/Button'
import PaleButton from '@components/buttons/PaleButton'
import LogoutIcon from '@components/icons/Logout'
import ReturnIcon from '@components/icons/Return'
import FormLayout from '@components/layout/FormLayout'
import LogoTitle from '@components/layout/LogoTitle'

export default function Logout() {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(null)

  const router = useRouter()

  const handleClick = () => {
    setLoading(true)
    logout()
      .then(setContent)
      .catch(console.error)
      .finally(() => setLoading(false))
  }
  if (content) {
    router.push('/')
  }

  const handleReturn = () => {
    if (typeof window !== 'undefined') {
      window.history.back()
    }
  }

  return (
    <FormLayout>
      <LogoTitle
        title="Log out of Strands"
        subtitle="Are you sure you want to log out?"
      />
      <div className="w-full flex justify-end">
        <PaleButton className="mr-6 font-light" onClick={handleReturn}>
          <ReturnIcon className="size-4 mr-2" />
          Return to app
        </PaleButton>
        <Button className="" disabled={loading} onClick={handleClick}>
          Log Out <LogoutIcon className="size-5 ml-2" />
        </Button>
      </div>
    </FormLayout>
  )
}
