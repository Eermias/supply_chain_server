const express = require("express");

const router = express.Router();

const {
  getPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder
} = require(
  "../controllers/purchaseOrderController"
);

router.get("/", getPurchaseOrders);

router.get("/:id", getPurchaseOrder);

router.post("/", createPurchaseOrder);

module.exports = router;