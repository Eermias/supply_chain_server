const orderService =
  require("../services/orderService");

const getOrders = async (req, res) => {

  try {

    const orders =
      await orderService.getAllOrders();

    res.json(orders);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch orders"
    });
  }
};

const getOrder = async (req, res) => {

  try {

    const { id } = req.params;

    const order =
      await orderService.getOrderById(id);

    if (!order) {

      return res.status(404).json({
        error: "Order not found"
      });
    }

    res.json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch order"
    });
  }
};

const createOrder = async (req, res) => {

  try {

    const {
      customer_id,
      status,
      items
    } = req.body;

    const orderId =
      await orderService.createOrder(
        customer_id,
        status,
        items
      );

    res.status(201).json({
      message: "Order created",
      orderId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder
};