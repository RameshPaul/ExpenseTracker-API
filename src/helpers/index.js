import Error from '../models/error'

export const exceptionToResponse = (exception, res) => {
  if (exception instanceof Error) {
    res.status(exception.httpCode).json({
      error: exception.message
    })
  } else {
    res.status(500)
  }
}
