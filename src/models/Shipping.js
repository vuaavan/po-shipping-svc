const mongoose = require("mongoose");

const shippingSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  address: { type: String, required: true },
  carrier: { type: String, required: true },
  trackingNumber: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Shipped", "Delivered"], default: "Pending" },
  shippingCost: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Shipping", shippingSchema);
