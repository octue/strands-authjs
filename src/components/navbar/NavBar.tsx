import { useUser } from '@allauth/hooks'

import LoggedIn from './LoggedIn'
import LoggedOut from './LoggedOut'

export default function NavBar() {
  const user = useUser()

  return user ? <LoggedIn /> : <LoggedOut />
}
