const express = require("express");

const router = express.Router();

const {
  getOrders,
  getOrder,
  createOrder
} = require("../controllers/orderController");

router.get("/", getOrders);

router.get("/:id", getOrder);

router.post("/", createOrder);

module.exports = router;