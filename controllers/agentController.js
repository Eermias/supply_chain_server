const agentService =
  require("../services/agentService");

const getAgents = async (req, res) => {

  try {

    const agents =
      await agentService.getAllAgents();

    res.json(agents);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch agents"
    });
  }
};

const getAgent = async (req, res) => {

  try {

    const { id } = req.params;

    const agent =
      await agentService.getAgentById(id);

    if (!agent) {

      return res.status(404).json({
        error: "Agent not found"
      });
    }

    res.json(agent);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch agent"
    });
  }
};

const createAgent = async (req, res) => {

  try {

    const {
      name,
      phone
    } = req.body;

    const result =
      await agentService.createAgent(
        name,
        phone
      );

    res.status(201).json({
      message: "Agent created",
      agentId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create agent"
    });
  }
};

module.exports = {
  getAgents,
  getAgent,
  createAgent
};