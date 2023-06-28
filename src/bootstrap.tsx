import './bootstrap.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import App from './App'
import PortalContextProvider from './contexts/PortalContextProvider'
import ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render (
  <AuthProvider
    authType={'cookie'}
    authName={'_auth'}
    cookieDomain={window.location.hostname}
    cookieSecure={window.location.protocol === 'https:'}
  >
    <PortalContextProvider>
      <BrowserRouter>

        <App />
        
        <ToastContainer
          autoClose={5000}
          position={toast.POSITION.BOTTOM_RIGHT}
          pauseOnFocusLoss={false}
          newestOnTop={true}
          limit={5}
        />

      </BrowserRouter>
    </PortalContextProvider>
  </AuthProvider>
)
