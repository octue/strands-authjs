'use client'

// import defaultAvatar from 'default-avatar.svg'
import type { FC } from 'react'
import { useState } from 'react'

import Image from 'next/image'
import type { ImageProps } from 'next/image'

import { useCurrentUser } from '@allauth/hooks'

type ProfileImage = Omit<ImageProps, 'src'>

// TODO REFACTOR REQUEST The avatar URL should be sent by the session, or be None in which case default used directly. This will be more performant and compatible with SSR.

const ProfileImage: FC<ProfileImage> = (props) => {
  const [error, setError] = useState(false)

  const user = useCurrentUser()

  const avatar = `https://storage.cloud.google.com/amy-assets-main-public/user_images/${user.username}.png`

  return (
    <Image
      {...props}
      src={error ? '/static/default-avatar.svg' : avatar}
      onError={() => {
        return setError(true)
      }}
      alt="Avatar"
    />
  )
}

export default ProfileImage
