import { AuthStateUserObject } from 'react-auth-kit/dist/types'
import { buildUserCookie } from '../utils/UserHelper'
import { toast } from 'react-toastify'
import {
  useAuthHeader,
  useAuthUser,
  useIsAuthenticated,
  useSignIn,
  useSignOut,
} from 'react-auth-kit'
import { useCallback, useEffect, useState } from 'react'
import AuthResponse from '../../apis/responses/AuthResponse'

export const useBasicAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<AuthStateUserObject | null>(null)
  const [token, setToken] = useState('')

  const onSignIn = useSignIn()
  const onSignOut = useSignOut()
  const getToken = useAuthHeader() 
  const checkAuthenticated = useIsAuthenticated()
  const getAuthUser = useAuthUser()

  const placeAuthFullState = useCallback(() => {
    if(!checkAuthenticated() && isAuthenticated){
      toast.info('Session has been expired, Please log in again')
    }
    setToken(getToken())
    setIsAuthenticated(checkAuthenticated())
    setCurrentUser(getAuthUser())
  }, [getToken, checkAuthenticated, getAuthUser, isAuthenticated])
  
  const signIn = (res: AuthResponse) => {
    const user = buildUserCookie(res)

    onSignIn({
      token: res.token,
      expiresIn: res.expiresIn,
      tokenType: 'Bearer',
      authState: user,
    })

    placeAuthFullState()
  }

  const signOut = useCallback(() => {
    onSignOut()
    setIsAuthenticated(false)
    setCurrentUser(null)
    setToken('')
  }, [onSignOut])

  useEffect(() => {
    placeAuthFullState()
  }, [placeAuthFullState])

  return { signIn, signOut, isAuthenticated, currentUser, token }
}
