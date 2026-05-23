const express = require("express");

const router = express.Router();

const {
  getInventory,
  createInventory,
  updateInventory
} = require("../controllers/inventoryController");

router.get("/", getInventory);

router.post("/", createInventory);

router.put("/", updateInventory);

module.exports = router;