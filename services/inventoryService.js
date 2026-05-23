const db = require("../config/db");

const getInventory = async () => {

  const [rows] = await db.query(`
    SELECT
      i.warehouse_id,
      w.name AS warehouse,

      i.product_id,
      p.name AS product,

      i.quantity

    FROM Inventory i

    JOIN Warehouses w
      ON i.warehouse_id = w.warehouse_id

    JOIN Products p
      ON i.product_id = p.product_id
  `);

  return rows;
};

const createInventory = async (
  warehouse_id,
  product_id,
  quantity
) => {

  const [result] = await db.query(`
    INSERT INTO Inventory
    (warehouse_id, product_id, quantity)
    VALUES (?, ?, ?)
  `, [
    warehouse_id,
    product_id,
    quantity
  ]);

  return result;
};

const updateInventory = async (
  warehouse_id,
  product_id,
  quantity
) => {

  const [result] = await db.query(`
    UPDATE Inventory
    SET quantity = ?
    WHERE warehouse_id = ?
    AND product_id = ?
  `, [
    quantity,
    warehouse_id,
    product_id
  ]);

  return result;
};

module.exports = {
  getInventory,
  createInventory,
  updateInventory
};