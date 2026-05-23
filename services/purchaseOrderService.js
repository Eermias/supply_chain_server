const db = require("../config/db");

const getAllPurchaseOrders = async () => {

  const [rows] = await db.query(`
    SELECT
      po.po_id,
      s.name AS supplier,
      po.order_date,
      po.expected_date,
      po.status
    FROM PurchaseOrders po
    JOIN Suppliers s
      ON po.supplier_id = s.supplier_id
  `);

  return rows;
};

const getPurchaseOrderById = async (id) => {

  const [orders] = await db.query(`
    SELECT
      po.po_id,
      s.name AS supplier,
      po.order_date,
      po.expected_date,
      po.status
    FROM PurchaseOrders po
    JOIN Suppliers s
      ON po.supplier_id = s.supplier_id
    WHERE po.po_id = ?
  `, [id]);

  if (orders.length === 0) {
    return null;
  }

  const [items] = await db.query(`
    SELECT
      poi.po_item_id,
      p.name AS product,
      poi.quantity,
      poi.unit_price
    FROM PurchaseOrderItems poi
    JOIN Products p
      ON poi.product_id = p.product_id
    WHERE poi.po_id = ?
  `, [id]);

  return {
    ...orders[0],
    items
  };
};

const createPurchaseOrder = async (
  supplier_id,
  warehouse_id,
  status,
  items
) => {

  const connection =
    await db.getConnection();

  try {

    await connection.beginTransaction();

    // Create Purchase Order
    const [poResult] =
      await connection.query(`
        INSERT INTO PurchaseOrders
        (
          supplier_id,
          order_date,
          expected_date,
          status
        )
        VALUES
        (?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 7 DAY), ?)
      `, [
        supplier_id,
        status
      ]);

    const poId = poResult.insertId;

    // Process Items
    for (const item of items) {

      const {
        product_id,
        quantity,
        unit_price
      } = item;

      // Insert PO Item
      await connection.query(`
        INSERT INTO PurchaseOrderItems
        (
          po_id,
          product_id,
          quantity,
          unit_price
        )
        VALUES (?, ?, ?, ?)
      `, [
        poId,
        product_id,
        quantity,
        unit_price
      ]);

      // Check inventory exists
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

      // If inventory record exists → increase stock
      if (inventoryRows.length > 0) {

        await connection.query(`
          UPDATE Inventory
          SET quantity = quantity + ?
          WHERE warehouse_id = ?
          AND product_id = ?
        `, [
          quantity,
          warehouse_id,
          product_id
        ]);

      } else {

        // Otherwise create inventory record
        await connection.query(`
          INSERT INTO Inventory
          (
            warehouse_id,
            product_id,
            quantity
          )
          VALUES (?, ?, ?)
        `, [
          warehouse_id,
          product_id,
          quantity
        ]);
      }
    }

    await connection.commit();

    return poId;

  } catch (error) {

    await connection.rollback();

    throw error;

  } finally {

    connection.release();
  }
};

module.exports = {
  getAllPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder
};