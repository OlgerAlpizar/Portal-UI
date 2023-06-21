declare module '*.scss' {
  const classes: {
    [key: string]: string
  }
  export default classes
}

declare module '*.png' {
  const src: string
  export default src
}

declare module 'authentication/AuthenticationRemote' {
  const AuthenticationRemote: React.ComponentType
  export default AuthenticationRemote
}

declare module 'user_management/UserManagementRemote' {
  const UserManagementRemote: React.ComponentType
  export default UserManagementRemote
}

