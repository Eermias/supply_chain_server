const express = require("express");

const router = express.Router();

const {
  getShipments,
  getShipment,
  createShipment
} = require("../controllers/shipmentController");

router.get("/", getShipments);

router.get("/:id", getShipment);

router.post("/", createShipment);

module.exports = router;