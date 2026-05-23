const db = require("../config/db");

const getTrackingByShipmentId = async (
  shipmentId
) => {

  const [rows] = await db.query(`
    SELECT
      tracking_id,
      shipment_id,
      location,
      status_update,
      update_date
    FROM ShipmentTracking
    WHERE shipment_id = ?
    ORDER BY update_date ASC
  `, [shipmentId]);

  return rows;
};

const createTrackingUpdate = async (
  shipment_id,
  location,
  status_update
) => {

  const [result] = await db.query(`
    INSERT INTO ShipmentTracking
    (
      shipment_id,
      location,
      status_update,
      update_date
    )
    VALUES (?, ?, ?, CURDATE())
  `, [
    shipment_id,
    location,
    status_update
  ]);

  return result;
};

module.exports = {
  getTrackingByShipmentId,
  createTrackingUpdate
};