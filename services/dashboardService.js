const db = require("../config/db");


// LOW STOCK PRODUCTS
const getLowStockProducts = async () => {

  const [rows] = await db.query(`
    SELECT
      p.product_id,
      p.name,
      SUM(i.quantity) AS total_stock,
      p.reorder_level
    FROM Products p
    JOIN Inventory i
      ON p.product_id = i.product_id
    GROUP BY p.product_id
    HAVING total_stock <= p.reorder_level
  `);

  return rows;
};


// TOP SELLING PRODUCTS
const getTopProducts = async () => {

  const [rows] = await db.query(`
    SELECT
      p.name,
      SUM(oi.quantity) AS total_sold
    FROM OrderItems oi
    JOIN Products p
      ON oi.product_id = p.product_id
    GROUP BY p.product_id
    ORDER BY total_sold DESC
    LIMIT 10
  `);

  return rows;
};


// MONTHLY REVENUE
const getMonthlyRevenue = async () => {

  const [rows] = await db.query(`
    SELECT
      DATE_FORMAT(payment_date, '%Y-%m')
        AS month,
      SUM(amount) AS revenue
    FROM Payments
    GROUP BY month
    ORDER BY month
  `);

  return rows;
};


// TOP CUSTOMERS
const getTopCustomers = async () => {

  const [rows] = await db.query(`
    SELECT
      c.name,
      SUM(p.amount) AS total_spent
    FROM Customers c
    JOIN Orders o
      ON c.customer_id = o.customer_id
    JOIN Payments p
      ON o.order_id = p.order_id
    GROUP BY c.customer_id
    ORDER BY total_spent DESC
    LIMIT 10
  `);

  return rows;
};


// SHIPMENT STATUS ANALYTICS
const getShipmentStatusStats = async () => {

  const [rows] = await db.query(`
    SELECT
      status,
      COUNT(*) AS total_shipments
    FROM Shipments
    GROUP BY status
  `);

  return rows;
};


// INVENTORY VALUE
const getInventoryValue = async () => {

  const [rows] = await db.query(`
    SELECT
      w.name AS warehouse,
      SUM(i.quantity * p.unit_price)
        AS inventory_value
    FROM Inventory i
    JOIN Warehouses w
      ON i.warehouse_id = w.warehouse_id
    JOIN Products p
      ON i.product_id = p.product_id
    GROUP BY w.warehouse_id
  `);

  return rows;
};



const getKPIs = async () => {

  // TOTAL REVENUE
  const [revenueRows] = await db.query(`
    SELECT IFNULL(SUM(amount), 0)
      AS total_revenue
    FROM Payments
  `);

  // TOTAL ORDERS
  const [orderRows] = await db.query(`
    SELECT COUNT(*) AS total_orders
    FROM Orders
  `);

  // TOTAL CUSTOMERS
  const [customerRows] = await db.query(`
    SELECT COUNT(*) AS total_customers
    FROM Customers
  `);

  // TOTAL PRODUCTS
  const [productRows] = await db.query(`
    SELECT COUNT(*) AS total_products
    FROM Products
  `);

  // TOTAL SHIPMENTS
  const [shipmentRows] = await db.query(`
    SELECT COUNT(*) AS total_shipments
    FROM Shipments
  `);

  // TOTAL INVENTORY VALUE
  const [inventoryRows] = await db.query(`
    SELECT
      IFNULL(
        SUM(i.quantity * p.unit_price),
        0
      ) AS inventory_value
    FROM Inventory i
    JOIN Products p
      ON i.product_id = p.product_id
  `);

  return {
    totalRevenue:
      revenueRows[0].total_revenue,

    totalOrders:
      orderRows[0].total_orders,

    totalCustomers:
      customerRows[0].total_customers,

    totalProducts:
      productRows[0].total_products,

    totalShipments:
      shipmentRows[0].total_shipments,

    inventoryValue:
      inventoryRows[0].inventory_value
  };
};


const getRecentOrders = async () => {

  const [rows] = await db.query(`
    SELECT
      o.order_id,
      c.name AS customer,
      o.order_date,
      o.status
    FROM Orders o
    JOIN Customers c
      ON o.customer_id = c.customer_id
    ORDER BY o.order_date DESC
    LIMIT 5
  `);

  return rows;
};


const getRecentShipments = async () => {

  const [rows] = await db.query(`
    SELECT
      s.shipment_id,
      c.name AS customer,
      s.shipped_date,
      s.status
    FROM Shipments s
    JOIN Orders o
      ON s.order_id = o.order_id
    JOIN Customers c
      ON o.customer_id = c.customer_id
    ORDER BY s.shipped_date DESC
    LIMIT 5
  `);

  return rows;
};


module.exports = {
  getLowStockProducts,
  getTopProducts,
  getMonthlyRevenue,
  getTopCustomers,
  getShipmentStatusStats,
  getInventoryValue,
  getKPIs,
  getRecentOrders,
  getRecentShipments
};