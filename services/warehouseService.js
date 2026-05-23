const db = require("../config/db");

const getAllWarehouses = async () => {

  const [rows] = await db.query(`
    SELECT * FROM Warehouses
  `);

  return rows;
};

const getWarehouseById = async (id) => {

  const [rows] = await db.query(`
    SELECT * FROM Warehouses
    WHERE warehouse_id = ?
  `, [id]);

  return rows[0];
};

const createWarehouse = async (
  name,
  location
) => {

  const [result] = await db.query(`
    INSERT INTO Warehouses
    (name, location)
    VALUES (?, ?)
  `, [name, location]);

  return result;
};

module.exports = {
  getAllWarehouses,
  getWarehouseById,
  createWarehouse
};