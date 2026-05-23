const express = require("express");

const router = express.Router();

const {
  getPayments,
  getPayment,
  createPayment
} = require("../controllers/paymentController");

router.get("/", getPayments);

router.get("/:id", getPayment);

router.post("/", createPayment);

module.exports = router;