const axios = require("axios")

exports.notifyShippingStatus = async (shipping) => {
  try {
    const notificationData = {
      orderId: shipping.orderId,
      trackingNumber: shipping.trackingNumber,
      status: shipping.status,
    }

    const response = await axios.post(
      "http://notification-service/notify",
      notificationData
    )
    return response.data
  } catch (error) {
    console.error("Error notifying shipping status:", error.message)
    throw error
  }
}
