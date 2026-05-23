const db = require("../config/db");

const getAllPayments = async () => {

  const [rows] = await db.query(`
    SELECT
      p.payment_id,
      p.order_id,
      c.name AS customer,
      p.amount,
      p.payment_date,
      p.payment_method
    FROM Payments p
    JOIN Orders o
      ON p.order_id = o.order_id
    JOIN Customers c
      ON o.customer_id = c.customer_id
  `);

  return rows;
};

const getPaymentById = async (id) => {

  const [rows] = await db.query(`
    SELECT
      p.payment_id,
      p.order_id,
      c.name AS customer,
      p.amount,
      p.payment_date,
      p.payment_method
    FROM Payments p
    JOIN Orders o
      ON p.order_id = o.order_id
    JOIN Customers c
      ON o.customer_id = c.customer_id
    WHERE p.payment_id = ?
  `, [id]);

  return rows[0];
};

const createPayment = async (
  order_id,
  amount,
  payment_method
) => {

  const [result] = await db.query(`
    INSERT INTO Payments
    (order_id, amount, payment_date, payment_method)
    VALUES (?, ?, CURDATE(), ?)
  `, [
    order_id,
    amount,
    payment_method
  ]);

  return result;
};

module.exports = {
  getAllPayments,
  getPaymentById,
  createPayment
};