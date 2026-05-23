const db = require("../config/db");

const getAllSuppliers = async () => {

  const [rows] = await db.query(`
    SELECT * FROM Suppliers
  `);

  return rows;
};

const getSupplierById = async (id) => {

  const [rows] = await db.query(`
    SELECT * FROM Suppliers
    WHERE supplier_id = ?
  `, [id]);

  return rows[0];
};

const createSupplier = async (
  name,
  email,
  phone,
  address
) => {

  const [result] = await db.query(`
    INSERT INTO Suppliers
    (name, email, phone, address)
    VALUES (?, ?, ?, ?)
  `, [
    name,
    email,
    phone,
    address
  ]);

  return result;
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  createSupplier
};