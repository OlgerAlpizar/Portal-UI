import { FC, createContext } from 'react'
import { toast } from 'react-toastify'
import { useBasicAuth } from '../shared/hooks/AuthHook'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthResponse from '../apis/responses/AuthResponse'

type SecurityContextProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  authenticator: any // as this is a hook, using any is easier than deconstruct the entire object
  onBasicAuth: (res: AuthResponse, alert: string, redirectPath: string) => void
  onBasicSignOut: (redirectPath: string) => void
  onNavigate: (path: string) => void
  getRouteLocation: () => void
}

const SecurityContext = createContext<SecurityContextProps | null>(null)

type SecurityContextProviderProps = {
  children: React.ReactNode
}

export const SecurityContextProvider: FC<SecurityContextProviderProps> = (
  props: SecurityContextProviderProps
) => {
  const navigator = useNavigate()
  const locator = useLocation()
  const authenticator = useBasicAuth()

  const onBasicAuth = (
    res: AuthResponse,
    alert: string,
    redirectPath: string
  ) => {
    authenticator.signIn(res)
    toast.success(alert)
    onNavigate(redirectPath)
  }

  const onBasicSignOut = (redirectPath: string) => {
    authenticator.signOut()
    onNavigate(redirectPath)
  }

  const onNavigate = (path: string) => {
    navigator(path)
  }

  const getRouteLocation = () => {
    return locator
  }

  return (
    <SecurityContext.Provider
      value={{
        authenticator: authenticator,
        onBasicAuth: onBasicAuth,
        onBasicSignOut: onBasicSignOut,
        onNavigate: onNavigate,
        getRouteLocation: getRouteLocation,
      }}
    >
      {props.children}
    </SecurityContext.Provider>
  )
}

export default SecurityContext
