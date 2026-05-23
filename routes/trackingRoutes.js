const express = require("express");

const router = express.Router();

const {
  getTracking,
  createTracking
} = require("../controllers/trackingController");

router.get("/:shipmentId", getTracking);

router.post("/", createTracking);

module.exports = router;