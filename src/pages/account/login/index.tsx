import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

// import { useConfig } from '@allauth/hooks'
import useSetErrors from '@allauth/hooks/useSetErrors'
import { login } from '@allauth/lib/allauth'
import { AnonymousRoute } from '@allauth/routing'

import Button from '@components/buttons/Button'
import ErrorBox from '@components/forms/ErrorBox'
import InputGroup from '@components/forms/fields/InputGroup'
import FormLayout from '@components/layouts/FormLayout'
import LogoTitle from '@components/layouts/LogoTitle'

// import ProviderList from '../../../socialaccount/ProviderList'

// Define the validation schema
const schema = z.object({
  email: z.string().email('Invalid email address'),
  // username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})

// Define the form data type
interface FormData {
  username: string
  email: string
  password: string
}

function Login() {
  // const config = useConfig()

  // const hasProviders = config.data.socialaccount?.providers?.length > 0

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const setErrors = useSetErrors<FormData>(setError)

  // Reset the form values if new data is received (e.g. from API refresh)
  // Note: not relevant for login forms, typically for things like user settings which are now done all over graph
  // useEffect(() => {
  //   reset(defaultValues)
  // }, [reset, defaultValues])

  // Submit data to login handler
  const onSubmit = (data: FormData) => {
    login(data).then(setErrors).catch(console.error)
  }

  return (
    <FormLayout>
      <LogoTitle title="Log in to Strands" />
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <ErrorBox error={errors?.root?.nonFieldError} />
        <InputGroup
          label="Email"
          id="email"
          error={errors?.email?.message}
          {...register('email')}
          autoComplete="email"
          required
        >
          <Link
            className="ml-2 mt-1 -mb-1 text-xs text-primary-600 hover:text-primary-500 dark:text-primary-300"
            href="/account/signup"
          >
            Not registered yet?
          </Link>
        </InputGroup>

        <InputGroup
          label="Password"
          id="password"
          type="password"
          error={errors?.password?.message}
          {...register('password')}
          autoComplete="current-password"
          required
        >
          <Link
            className="ml-2 text-xs mt-1 -mb-1 text-primary-600 hover:text-primary-500 dark:text-primary-300"
            href="/account/password/reset"
          >
            Forgot password?
          </Link>
        </InputGroup>
        <Button type="submit" className="w-full !mt-10" disabled={isSubmitting}>
          Log in
        </Button>
      </form>

      <div className="flex w-full items-center px-8 my-6">
        <div className="flex-grow h-[1px] bg-gray-300 dark:bg-white/70" />
        <span className="px-6 text-sm font-light text-gray-400 dark:text-white/70">
          Or
        </span>
        <div className="flex-grow h-[1px] bg-gray-300 dark:bg-white/70" />
      </div>
      <Link
        className="mt-4 text-primary-600 hover:text-white flex justify-center border items-center rounded-md px-6 py-1.5 text-sm font-normal leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-none border-primary-600 hover:border-primary-500 hover:bg-primary-500 focus-visible:outline-primary-500"
        href="/account/login/code"
      >
        Mail me a login code
      </Link>
      {/* {hasProviders ? (
        <>
          <h2>Or use a third-party</h2>
          <ProviderList callbackURL="/account/provider/callback" />
        </>
      ) : null} */}
      {/* <FormLinkLine
        href="/account/signup"
        purpose="No account?"
        action="Sign up here."
      /> */}
    </FormLayout>
  )
}

/* TODO REFACTOR REQUEST Anonymous pages should be routed using next middleware
 * See _app.tsx
 */
export default function AnonymousLogin({ ...pageProps }) {
  return (
    <AnonymousRoute>
      <Login {...pageProps} />
    </AnonymousRoute>
  )
}
