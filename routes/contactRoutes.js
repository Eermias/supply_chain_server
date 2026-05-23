const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContact,
  createContact
} = require("../controllers/contactController");

router.get("/contact/:id", getContact);

router.get("/:supplierId", getContacts);

router.post("/", createContact);

module.exports = router;