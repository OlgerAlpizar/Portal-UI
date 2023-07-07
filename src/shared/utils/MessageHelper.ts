// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseCatchMessage = (error: any) => {
  return (
    error.response?.data?.message ??
    error.response?.data?.substring(0, 200) ??
    error.response ??
    error.message ??
    error
  )
}
