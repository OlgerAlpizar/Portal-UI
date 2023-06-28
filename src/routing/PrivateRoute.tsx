import { Navigate } from 'react-router-dom'
import { PortalContext } from '../contexts/PortalContext'
import { toast } from 'react-toastify'
import React, { FC, useContext } from 'react'

type PrivateRouteProps = {
  children?: React.ReactNode
}

const PrivateRoute: FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
  const ctx = useContext(PortalContext)

  
  const redirect = () => {
    toast.error('Un-authorized user. Please sign in first')
    return (
      <Navigate to="/home" />
    )
  }

  return (
    <>{ctx?.isAuthenticated ? props.children : redirect()}</>
  )
}

export default PrivateRoute