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
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (request) => {
        request.headers['Authorization'] = ctx?.authenticator.token
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
        return Promise.reject(error)
      }
    )
    return () => {
      // clean
      axiosPrivate.interceptors.request.eject(requestInterceptor)
      axiosPrivate.interceptors.response.eject(responseInterceptor)
    }
  }, [ctx, axiosPrivate])

  return axiosPrivate
}
