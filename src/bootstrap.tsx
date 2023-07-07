import './bootstrap.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from 'react-auth-kit'
import { BrowserRouter } from 'react-router-dom'
import { SecurityContextProvider } from './contexts/SecurityContext'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import Toaster from './shared/components/toaster/Toaster'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider
      authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === 'https:'}
    >
      <BrowserRouter>
        <SecurityContextProvider>
          <App />
          <Toaster />
        </SecurityContextProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
