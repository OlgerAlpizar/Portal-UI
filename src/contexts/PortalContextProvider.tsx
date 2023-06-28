import {
  FC,
  useEffect,
  useState
} from 'react'
import { PortalContext } from './PortalContext'
import { toast } from 'react-toastify'
import PubSub from 'pubsub-js'
import PubSubTopic from '../models/PubSubTopic'

type PortalContextProviderProps = {
  children: React.ReactNode
}

const PortalContextProvider: FC<PortalContextProviderProps> = (
  props: PortalContextProviderProps
) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userAvatar, setUserAvatar] = useState('')

  useEffect(() => {
    PubSub.subscribe(PubSubTopic[PubSubTopic.SIGN_IN], subscribeMethod)
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subscribeMethod = (topic: string, data: any) => {
    toast.success(`Intercept ${topic} for the user: ${data.email}`)
    setIsAuthenticated(true)
  }

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
