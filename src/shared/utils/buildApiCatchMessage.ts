// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const buildApiCatchMessage = (error: any) => {
  return (
    error.response?.data?.message ?? //Custom error handler built in c#
    error.response?.data?.substring(0, 200) ?? //Default error handler in c#
    error.response ??
    error.message ??
    error
  ) //finally if any other exist
}
