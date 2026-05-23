const paymentService =
  require("../services/paymentService");

const getPayments = async (req, res) => {

  try {

    const payments =
      await paymentService.getAllPayments();

    res.json(payments);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch payments"
    });
  }
};

const getPayment = async (req, res) => {

  try {

    const { id } = req.params;

    const payment =
      await paymentService.getPaymentById(id);

    if (!payment) {

      return res.status(404).json({
        error: "Payment not found"
      });
    }

    res.json(payment);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch payment"
    });
  }
};

const createPayment = async (req, res) => {

  try {

    const {
      order_id,
      amount,
      payment_method
    } = req.body;

    const result =
      await paymentService.createPayment(
        order_id,
        amount,
        payment_method
      );

    res.status(201).json({
      message: "Payment created",
      paymentId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create payment"
    });
  }
};

module.exports = {
  getPayments,
  getPayment,
  createPayment
};