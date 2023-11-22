import express from 'express'
import { Application, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import connectDB from './config/db'
import { errorHandler, notFound } from './middlewares/errorMiddleware'

// Routes

import userRoutes from './routes/userRoutes'
import postRoutes from './routes/postRoutes'
import commentRoutes from './routes/commentRoutes'
 
const app: Application = express()

dotenv.config()

connectDB()

//app.use(cors());
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Default
// app.get('/api', (req: Request, res: Response) => {
//   res.status(201).json({ message: 'Welcome to Hotel Booking App' })
// })

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 5000
console.log('PORT: ' + PORT)

app.listen(PORT, (): void => console.log(`Server is running on PORT ${PORT}`))
