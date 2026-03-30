import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/user.js"
import habitRoutes from "./routes/habitRoutes.js"
import analyticsRoutes from "./routes/analyticsRoutes.js"

dotenv.config()

const app = express()


// CORS CONFIGURATION
app.use(
  cors({
    origin: process.env.FRONTEND_URL ,
    credentials: true
  })
)


// BODY PARSER
app.use(express.json())


// ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/habits", habitRoutes)
app.use("/api/analytics", analyticsRoutes)


// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err))


// SERVER
const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})