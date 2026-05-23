const express = require("express");

const router = express.Router();

const {
  getVehicles,
  getVehicle,
  createVehicle
} = require("../controllers/vehicleController");

router.get("/", getVehicles);

router.get("/:id", getVehicle);

router.post("/", createVehicle);

module.exports = router;