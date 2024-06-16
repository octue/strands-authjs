import { useConfig } from '@allauth/hooks'
import { AuthenticatedRoute } from '@allauth/routing'

import Layout from '@components/layout/Layout'
import PageHeader from '@components/layout/PageHeader'
import Emails from '@containers/allauth/emails'
import Providers from '@containers/allauth/providers'
import Sessions from '@containers/allauth/sessions'

const crumbs = [{ name: 'account', href: '/account' }]

const Account = () => {
  const config = useConfig()

  return (
    <Layout>
      {/* Full-width on mobile, constrained to breakpoint with padded content above mobile */}
      <div className="container mx-auto sm:px-6 lg:px-8 pb-32 bg-white min-h-screen">
        <PageHeader title="Account Settings" crumbs={crumbs} />
        <PageHeader title="Security" as="h2" divider />
        <div className="mt-8 space-y-16">
          <Emails />
          {config.data.usersessions && <Sessions />}
          {config.data.socialaccount && <Providers />}
          {/* TODO {config.data.mfa && <TwoFactorAuth />} */}
        </div>
      </div>
    </Layout>
  )
}

/* TODO REFACTOR REQUEST Authenticated pages should be routed using next middleware
 * See _app.tsx
 */
export default function AuthenticatedAccount({ ...pageProps }) {
  return (
    <AuthenticatedRoute>
      <Account {...pageProps} />
    </AuthenticatedRoute>
  )
}
