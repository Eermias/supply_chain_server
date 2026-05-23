const db = require("../config/db");

const getAllVehicles = async () => {

  const [rows] = await db.query(`
    SELECT * FROM Vehicles
  `);

  return rows;
};

const getVehicleById = async (id) => {

  const [rows] = await db.query(`
    SELECT * FROM Vehicles
    WHERE vehicle_id = ?
  `, [id]);

  return rows[0];
};

const createVehicle = async (
  registration_number,
  type,
  capacity
) => {

  const [result] = await db.query(`
    INSERT INTO Vehicles
    (registration_number, type, capacity)
    VALUES (?, ?, ?)
  `, [
    registration_number,
    type,
    capacity
  ]);

  return result;
};

module.exports = {
  getAllVehicles,
  getVehicleById,
  createVehicle
};