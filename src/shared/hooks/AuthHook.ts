import { AuthStateUserObject } from 'react-auth-kit/dist/types'
import { buildUserCookie } from '../utils/UserHelper'
import {
  useAuthHeader,
  useAuthUser,
  useIsAuthenticated,
  useSignIn,
  useSignOut,
} from 'react-auth-kit'
import { useState } from 'react'
import AuthResponse from '../../apis/responses/AuthResponse'

export const useBasicAuth = () => {
  const onSignIn = useSignIn()
  const onSignOut = useSignOut()
  const getToken = useAuthHeader()
  const checkAuthenticated = useIsAuthenticated()
  const getAuthUser = useAuthUser()

  const [isAuthenticated, setIsAuthenticated] = useState(checkAuthenticated())
  const [currentUser, setCurrentUser] = useState<AuthStateUserObject | null>(
    getAuthUser()
  )
  const [token, setToken] = useState(getToken())

  const signIn = (res: AuthResponse) => {
    const user = buildUserCookie(res)

    onSignIn({
      token: res.token,
      expiresIn: res.expiresIn,
      tokenType: 'Bearer',
      authState: user,
    })

    setIsAuthenticated(true)
    setCurrentUser(user)
    setToken(getToken())
  }

  const signOut = () => {
    onSignOut()
    setIsAuthenticated(false)
    setCurrentUser(null)
    setToken('')
  }

  return { signIn, signOut, isAuthenticated, currentUser, token }
}
