const axios = require("axios")

exports.updateOrderShippingStatus = async (orderId, status) => {
  try {
    const response = await axios.patch(
      `http://order-service/orders/${orderId}/shipping-status`,
      { status }
    )
    return response.data
  } catch (error) {
    console.error("Error updating order shipping status:", error.message)
    throw error
  }
}
