class Config {
  static authenticationApi = (): string => {
    return process.env.AUTHENTICATION_BACKEND || ''
  }

  static port = (): number => {
    return parseInt(process.env.PORT || '')
  }

  static analyzerPort = (): number => {
    return parseInt(process.env.ANALYZER_PORT || '')
  }

  static env = (): string => {
    return process.env.NODE_ENV || 'development'
  }
}

export default Config
