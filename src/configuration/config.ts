class Config {
  static port = (): number => parseInt(process.env.PORT || '')

  static analyzerPort = (): number => parseInt(process.env.ANALYZER_PORT || '')

  static env = (): string => process.env.NODE_ENV || 'development'
}

export default Config