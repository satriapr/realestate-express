export const responseSuccess = (
  statusCode: number,
  message: string,
  data?: object
) => {
  return {
    statusCode,
    message,
    data,
  }
}

export const responseError = (
  statusCode: number,
  message: string,
  error: object
) => {
  return {
    statusCode,
    message,
    error,
  }
}
