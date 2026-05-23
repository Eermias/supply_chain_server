const db = require("../config/db");

const getAllCategories = async () => {
  const [rows] = await db.query(
    "SELECT * FROM Categories"
  );

  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM Categories WHERE category_id = ?",
    [id]
  );

  return rows[0];
};

const createCategory = async (name, description) => {
  const [result] = await db.query(
    `
    INSERT INTO Categories (name, description)
    VALUES (?, ?)
    `,
    [name, description]
  );

  return result;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory
};