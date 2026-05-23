const express = require("express");

const router = express.Router();

const {
  getWarehouses,
  getWarehouse,
  createWarehouse
} = require("../controllers/warehouseController");

router.get("/", getWarehouses);

router.get("/:id", getWarehouse);

router.post("/", createWarehouse);

module.exports = router;