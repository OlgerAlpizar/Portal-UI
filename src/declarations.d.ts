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

declare module 'login/LoginRemote' {
  const LoginRemote: React.ComponentType
  export default LoginRemote
}
