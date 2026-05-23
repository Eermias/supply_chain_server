const db = require("../config/db");

const getContactsBySupplierId = async (
  supplierId
) => {

  const [rows] = await db.query(`
    SELECT *
    FROM SupplierContacts
    WHERE supplier_id = ?
  `, [supplierId]);

  return rows;
};

const getContactById = async (id) => {

  const [rows] = await db.query(`
    SELECT *
    FROM SupplierContacts
    WHERE contact_id = ?
  `, [id]);

  return rows[0];
};

const createContact = async (
  supplier_id,
  name,
  phone,
  email,
  position
) => {

  const [result] = await db.query(`
    INSERT INTO SupplierContacts
    (
      supplier_id,
      name,
      phone,
      email,
      position
    )
    VALUES (?, ?, ?, ?, ?)
  `, [
    supplier_id,
    name,
    phone,
    email,
    position
  ]);

  return result;
};

module.exports = {
  getContactsBySupplierId,
  getContactById,
  createContact
};