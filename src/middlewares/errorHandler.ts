import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err)
  res.status(500).send({ errors: [{ message: 'Something went wrong' }] })
}

// import { Request, Response, NextFunction } from 'express'
// import HttpError from '../utils/HttpError'

// function errorHandler(
//   err: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) {
//   if (res.headersSent) {
//     return next(err)
//   }

//   const statusCode = err instanceof HttpError ? err.statusCode : 500
//   const message = err.message || 'Internal Server Error'

//   res.status(statusCode).json({ error: message })
//   return next()
// }

// export default errorHandler
