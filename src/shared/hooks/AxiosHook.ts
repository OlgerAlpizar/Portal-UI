import { useContext, useEffect } from 'react'
import SecurityContext from '../../contexts/SecurityContext'
import axios from 'axios'

export const useAxiosInstance = (baseUrl: string) => {
  const ctx = useContext(SecurityContext)

  const axiosPrivate = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  })

  useEffect(() => {
    const token = ctx?.authenticator.token
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (request) => {
        request.headers['Authorization'] = token
        return request
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if(error.response.status === 401){//when something defined that user is not authenticated
          ctx?.authenticator.signOut()
          ctx?.onBasicSignOut('/')
        }
        return Promise.reject(error)
      }
    )
    return () => {
      // clean
      axiosPrivate.interceptors.request.eject(requestInterceptor)
      axiosPrivate.interceptors.response.eject(responseInterceptor)
    }
  }, [axiosPrivate, ctx])

  return axiosPrivate
}
