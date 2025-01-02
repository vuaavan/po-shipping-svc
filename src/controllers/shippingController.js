const Shipping = require("../models/Shipping")
const orderService = require("../services/orderService")
const notificationService = require("../services/notificationService")

// Create shipping details
exports.createShipping = async (req, res) => {
  try {
    const { orderId, address, carrier, trackingNumber, shippingCost } = req.body

    const shipping = new Shipping({
      orderId,
      address,
      carrier,
      trackingNumber,
      shippingCost,
    })
    await shipping.save()

    // Notify Order Service about shipping creation
    await orderService.updateOrderShippingStatus(orderId, "Shipped")

    res.status(201).json({ message: "Shipping created successfully", shipping })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating shipping", error: error.message })
  }
}

// Update shipping status
exports.updateShippingStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const shipping = await Shipping.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!shipping) {
      return res.status(404).json({ message: "Shipping not found" })
    }

    // Notify Notification Service
    await notificationService.notifyShippingStatus(shipping)

    res.status(200).json({ message: "Shipping status updated", shipping })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating shipping status", error: error.message })
  }
}

// Calculate shipping cost
exports.calculateShippingCost = (req, res) => {
  try {
    const { weight, distance } = req.body

    // Simple cost calculation logic
    const cost = weight * 0.5 + distance * 0.2

    res.status(200).json({ shippingCost: cost })
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error calculating shipping cost",
        error: error.message,
      })
  }
}
