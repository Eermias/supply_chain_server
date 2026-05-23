const db = require("../config/db");

const getAllCustomers = async () => {

  const [rows] = await db.query(`
    SELECT * FROM Customers
  `);

  return rows;
};

const getCustomerById = async (id) => {

  const [rows] = await db.query(`
    SELECT * FROM Customers
    WHERE customer_id = ?
  `, [id]);

  return rows[0];
};

const createCustomer = async (
  name,
  email,
  phone,
  address
) => {

  const [result] = await db.query(`
    INSERT INTO Customers
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
  getAllCustomers,
  getCustomerById,
  createCustomer
};