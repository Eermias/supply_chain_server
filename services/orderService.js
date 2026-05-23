const db = require("../config/db");

const getAllOrders = async () => {

  const [rows] = await db.query(`
    SELECT
      o.order_id,
      c.name AS customer,
      o.order_date,
      o.status
    FROM Orders o
    JOIN Customers c
      ON o.customer_id = c.customer_id
  `);

  return rows;
};

const getOrderById = async (id) => {

  const [orders] = await db.query(`
    SELECT
      o.order_id,
      c.name AS customer,
      o.order_date,
      o.status
    FROM Orders o
    JOIN Customers c
      ON o.customer_id = c.customer_id
    WHERE o.order_id = ?
  `, [id]);

  if (orders.length === 0) {
    return null;
  }

  const [items] = await db.query(`
    SELECT
      oi.order_item_id,
      p.name AS product,
      oi.quantity,
      oi.unit_price
    FROM OrderItems oi
    JOIN Products p
      ON oi.product_id = p.product_id
    WHERE oi.order_id = ?
  `, [id]);

  return {
    ...orders[0],
    items
  };
};

const createOrder = async (
  customer_id,
  status,
  items
) => {

  const connection =
    await db.getConnection();

  try {

    await connection.beginTransaction();

    // 1. Create Order
    const [orderResult] =
      await connection.query(`
        INSERT INTO Orders
        (customer_id, order_date, status)
        VALUES (?, CURDATE(), ?)
      `, [
        customer_id,
        status
      ]);

    const orderId =
      orderResult.insertId;

    // 2. Process Items
    for (const item of items) {

      const {
        product_id,
        warehouse_id,
        quantity,
        unit_price
      } = item;

      // Check inventory
      const [inventoryRows] =
        await connection.query(`
          SELECT quantity
          FROM Inventory
          WHERE warehouse_id = ?
          AND product_id = ?
        `, [
          warehouse_id,
          product_id
        ]);

      if (
        inventoryRows.length === 0
      ) {
        throw new Error(
          "Inventory record not found"
        );
      }

      const currentStock =
        inventoryRows[0].quantity;

      if (currentStock < quantity) {

        throw new Error(
          `Insufficient stock for product ID ${product_id}`
        );
      }

      // Insert order item
      await connection.query(`
        INSERT INTO OrderItems
        (order_id, product_id, quantity, unit_price)
        VALUES (?, ?, ?, ?)
      `, [
        orderId,
        product_id,
        quantity,
        unit_price
      ]);

      // Reduce inventory
      await connection.query(`
        UPDATE Inventory
        SET quantity = quantity - ?
        WHERE warehouse_id = ?
        AND product_id = ?
      `, [
        quantity,
        warehouse_id,
        product_id
      ]);
    }

    await connection.commit();

    return orderId;

  } catch (error) {

    await connection.rollback();

    throw error;

  } finally {

    connection.release();
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder
};