const db = require("../config/db");

const getAllAgents = async () => {

  const [rows] = await db.query(`
    SELECT * FROM DeliveryAgents
  `);

  return rows;
};

const getAgentById = async (id) => {

  const [rows] = await db.query(`
    SELECT * FROM DeliveryAgents
    WHERE agent_id = ?
  `, [id]);

  return rows[0];
};

const createAgent = async (
  name,
  phone
) => {

  const [result] = await db.query(`
    INSERT INTO DeliveryAgents
    (name, phone)
    VALUES (?, ?)
  `, [
    name,
    phone
  ]);

  return result;
};

module.exports = {
  getAllAgents,
  getAgentById,
  createAgent
};