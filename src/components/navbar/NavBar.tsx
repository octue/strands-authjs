import { useCurrentUser } from '@allauth/hooks'

import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

export default function NavBar() {
  const user = useCurrentUser()

  return user ? <LoggedIn /> : <LoggedOut />
}
