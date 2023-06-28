import { Dispatch, SetStateAction, createContext } from 'react'

type PortalContextProps = {
  isAuthenticated: boolean
  userEmail: string
  userAvatar: string
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  setUserEmail: Dispatch<SetStateAction<string>>
  setUserAvatar: Dispatch<SetStateAction<string>>
}

export const PortalContext = createContext<PortalContextProps | null>(
  null
)