import { axiosTextHeader } from '../shared/utils/AuthUserHelper'
import AuthResponse from '../models/responses/AuthResponse'
import Config from '../configurations/config'
import Cookies from 'js-cookie';
import CreateAccount from '../models/requests/CreateAccountRequest'
import SignInRequest from '../models/requests/SignInRequest'
import SocialLink from '../models/SocialLink'
import axios from 'axios'


const authApi = axios.create({
  baseURL: Config.authenticationApi(),
  headers: axiosTextHeader()
})

authApi.interceptors.request.use(
  (requestConfig) => {
    const authToken = Cookies.get('_auth')
    requestConfig.headers['Authentication'] = authToken ? authToken : ''
    return requestConfig;
  }
)

export const onLoginSocialLink = async (link: SocialLink): Promise<unknown> => {
  throw `Social login not implemented yet ${link}`
}

export const onRegisterSocialLink = async (
  link: SocialLink
): Promise<unknown> => {
  throw `Social register not implemented yet ${link}`
}

export const onBasicLogin = async (
  request: SignInRequest
): Promise<AuthResponse> => {
  return authApi.post('/sign-in', request)
    .then((res) => res.data)
}

export const onBasicRegister = async (
  request: CreateAccount
): Promise<AuthResponse> => {
  return authApi.post('/sign-up', request)
    .then((res) => res.data)
}

export const onForgotPassword = async (request: string): Promise<unknown> => {
  return authApi.post(
    '/forgot-password',
    request,
    {
      withCredentials: true
    })
    .then((res) => res.data)
}