import {
  FC,
  useState
} from 'react'
import { PortalContext } from './PortalContext'
import { useIsAuthenticated } from 'react-auth-kit'

type PortalContextProviderProps = {
  children: React.ReactNode
}

const PortalContextProvider: FC<PortalContextProviderProps> = (
  props: PortalContextProviderProps
) => {
  const [isAuthenticated, setIsAuthenticated] = useState(useIsAuthenticated())
  const [userEmail, setUserEmail] = useState('')
  const [userAvatar, setUserAvatar] = useState('')

  return (
    <PortalContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        userEmail: userEmail,
        userAvatar: userAvatar,
        setIsAuthenticated: setIsAuthenticated,
        setUserEmail: setUserEmail,
        setUserAvatar: setUserAvatar
      }}
    >
      {props.children}
    </PortalContext.Provider>
  )
}

export default PortalContextProvider
