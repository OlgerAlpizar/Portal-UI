import AuthResponse from '../../models/responses/AuthResponse'

export const buildUserCookieInfo = (res: AuthResponse) => {
  return {
    firstName: res.firstName,
    lastName: res.lastName,
    avatar: res.avatar,
    email: res.email
  }
}

export const axiosTextHeader = () => {
  return {
    'Content-type': 'application/json',
  }
}