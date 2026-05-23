const express = require("express");

const router = express.Router();

const {
  getAgents,
  getAgent,
  createAgent
} = require("../controllers/agentController");

router.get("/", getAgents);

router.get("/:id", getAgent);

router.post("/", createAgent);

module.exports = router;