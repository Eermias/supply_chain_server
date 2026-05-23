const express = require("express");

const router = express.Router();

const {
  getSuppliers,
  getSupplier,
  createSupplier
} = require("../controllers/supplierController");

router.get("/", getSuppliers);

router.get("/:id", getSupplier);

router.post("/", createSupplier);

module.exports = router;