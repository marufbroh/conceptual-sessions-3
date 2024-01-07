/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { userRoutes } from './routes/user.route'
import { tourRoutes } from './routes/tour.route'
import { reviewRoutes } from './routes/review.route'
import { dbConnect } from './utils/dbConnect'
import notFound from './middlewares/notFound'
import globalErrorHandler from './middlewares/globalErrorHandler'
import globalRoute from './routes'
import cookieParser from 'cookie-parser'
const app: Application = express()

// parsers
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// connections
dbConnect()

// routes
app.use('/api/v1', globalRoute)

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Murir Tin Tours & Travels',
  })
})

//catch all route - Trying to catch a Not Found Route
//Controller Approach
// Way-1
// app.all('*', (req: Request, res: Response) => {
//   console.log(req.originalUrl)
//   res.status(404).json({
//     status: 'fail',
//     message: `Route Not Found for ${req.originalUrl}`,
//   })
// })

// Way-2
// app.get('*', notFound)
// app.post('*', notFound)

//Middleware Approach
// app.use("*", notFound)
// app.all('*', notFound)
app.use(notFound)

app.use(globalErrorHandler)

export default app
