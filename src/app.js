const express = require("express")
const mongoose = require("mongoose")
const shippingRoutes = require("./routes/shippingRoutes")

const app = express()

// Middleware
app.use(express.json())

// Routes
app.use("/shipping", shippingRoutes)

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/shipping-service", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error))

module.exports = app
