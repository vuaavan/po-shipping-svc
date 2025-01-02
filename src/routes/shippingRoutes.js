const express = require("express")
const router = express.Router()
const shippingController = require("../controllers/shippingController")

router.post("/", shippingController.createShipping)
router.patch("/:id/status", shippingController.updateShippingStatus)
router.post("/calculate-cost", shippingController.calculateShippingCost)

module.exports = router
