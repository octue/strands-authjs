import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useCurrentUser } from '@allauth/hooks'
import useSetErrors from '@allauth/hooks/useSetErrors'
import { changePassword } from '@allauth/lib/allauth'
import { AuthenticatedRoute } from '@allauth/routing'

import Button from '@components/buttons/Button'
import ErrorBox from '@components/forms/ErrorBox'
import InputGroup from '@components/forms/fields/InputGroup'
import FormLayout from '@components/layout/FormLayout'
import LogoTitle from '@components/layout/LogoTitle'

// Define the validation schema
const schema = z.object({
  current_password: z.string(),
  new_password: z
    .string()
    .min(8, 'Password must be at least 8 characters long'),
})

// Define the form data type
interface FormData {
  current_password: string
  new_password: string
}

function PasswordChange() {
  const router = useRouter()
  const hasCurrentPassword = useCurrentUser().has_usable_password

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const setErrors = useSetErrors<FormData>(setError)

  // Submit data to login handler
  const onSubmit = (data: FormData) => {
    changePassword(data)
      .then((response) => {
        if (!response?.errors) {
          router.push('/')
        } else {
          setErrors(response)
        }
      })
      .catch(console.error)
  }

  return (
    <FormLayout>
      <LogoTitle
        title={hasCurrentPassword ? 'Change Password' : 'Set Password'}
      />

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <ErrorBox error={errors?.root?.nonFieldError} />
        {hasCurrentPassword ? (
          <InputGroup
            label="Current password"
            id="current_password"
            type="password"
            error={errors?.current_password?.message}
            help="Enter your existing password"
            {...register('current_password')}
            autoComplete="current-password"
            required
          />
        ) : null}

        <InputGroup
          label="New password"
          id="new_password"
          type="password"
          help="Choose a new password"
          error={errors?.new_password?.message}
          {...register('new_password')}
          required
        />

        <Button type="submit" className="w-full !mt-8" disabled={isSubmitting}>
          {hasCurrentPassword ? 'Change' : 'Set'}
        </Button>
      </form>
    </FormLayout>
  )
}

/* TODO REFACTOR REQUEST Authenticated pages should be routed using next middleware
 * See _app.tsx
 */
export default function AuthenticatedPasswordChange({ ...pageProps }) {
  return (
    <AuthenticatedRoute>
      <PasswordChange {...pageProps} />
    </AuthenticatedRoute>
  )
}
