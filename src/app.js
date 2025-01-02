const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const shippingRoutes = require("./routes/shippingRoutes")

dotenv.config()

const app = express()

// Middleware
app.use(express.json())

// Routes
app.use("/shipping", shippingRoutes)

// Database Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error))

module.exports = app
