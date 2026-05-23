const db = require("../config/db");

const getAllShipments = async () => {

  const [rows] = await db.query(`
    SELECT
      s.shipment_id,

      c.name AS customer,

      w.name AS warehouse,

      a.name AS agent,

      v.registration_number AS vehicle,

      s.shipped_date,
      s.status

    FROM Shipments s

    JOIN Orders o
      ON s.order_id = o.order_id

    JOIN Customers c
      ON o.customer_id = c.customer_id

    JOIN Warehouses w
      ON s.warehouse_id = w.warehouse_id

    JOIN DeliveryAgents a
      ON s.agent_id = a.agent_id

    JOIN Vehicles v
      ON s.vehicle_id = v.vehicle_id
  `);

  return rows;
};

const getShipmentById = async (id) => {

  const [rows] = await db.query(`
    SELECT
      s.shipment_id,

      c.name AS customer,

      w.name AS warehouse,

      a.name AS agent,

      v.registration_number AS vehicle,

      s.shipped_date,
      s.status

    FROM Shipments s

    JOIN Orders o
      ON s.order_id = o.order_id

    JOIN Customers c
      ON o.customer_id = c.customer_id

    JOIN Warehouses w
      ON s.warehouse_id = w.warehouse_id

    JOIN DeliveryAgents a
      ON s.agent_id = a.agent_id

    JOIN Vehicles v
      ON s.vehicle_id = v.vehicle_id

    WHERE s.shipment_id = ?
  `, [id]);

  return rows[0];
};

const createShipment = async (
  order_id,
  warehouse_id,
  agent_id,
  vehicle_id,
  status
) => {

  const [result] = await db.query(`
    INSERT INTO Shipments
    (
      order_id,
      warehouse_id,
      agent_id,
      vehicle_id,
      shipped_date,
      status
    )
    VALUES (?, ?, ?, ?, CURDATE(), ?)
  `, [
    order_id,
    warehouse_id,
    agent_id,
    vehicle_id,
    status
  ]);

  return result;
};

module.exports = {
  getAllShipments,
  getShipmentById,
  createShipment
};