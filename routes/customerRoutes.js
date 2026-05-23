const express = require("express");

const router = express.Router();

const {
  getCustomers,
  getCustomer,
  createCustomer
} = require("../controllers/customerController");

router.get("/", getCustomers);

router.get("/:id", getCustomer);

router.post("/", createCustomer);

module.exports = router;