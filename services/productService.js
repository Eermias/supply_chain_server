const db = require("../config/db");

const getAllProducts = async () => {
  const [rows] = await db.query(`
    SELECT
      p.product_id,
      p.name,
      p.unit_price,
      p.reorder_level,
      c.name AS category
    FROM Products p
    JOIN Categories c
      ON p.category_id = c.category_id
  `);

  return rows;
};

const getProductById = async (id) => {
  const [rows] = await db.query(`
    SELECT
      p.product_id,
      p.name,
      p.unit_price,
      p.reorder_level,
      c.name AS category
    FROM Products p
    JOIN Categories c
      ON p.category_id = c.category_id
    WHERE p.product_id = ?
  `, [id]);

  return rows[0];
};

const createProduct = async (
  category_id,
  name,
  unit_price,
  reorder_level
) => {

  const [result] = await db.query(`
    INSERT INTO Products
    (category_id, name, unit_price, reorder_level)
    VALUES (?, ?, ?, ?)
  `, [
    category_id,
    name,
    unit_price,
    reorder_level
  ]);

  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct
};