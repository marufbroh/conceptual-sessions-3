import { Server } from 'http'
import app from './app'
const port = process.env.PORT || 5000

let server: Server

const startServer = async () => {
  try {
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()

process.on('unhandledRejection', () => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`)
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`)
  process.exit(1)
})
