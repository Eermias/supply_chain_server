const shipmentService =
  require("../services/shipmentService");

const getShipments = async (req, res) => {

  try {

    const shipments =
      await shipmentService.getAllShipments();

    res.json(shipments);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch shipments"
    });
  }
};

const getShipment = async (req, res) => {

  try {

    const { id } = req.params;

    const shipment =
      await shipmentService.getShipmentById(id);

    if (!shipment) {

      return res.status(404).json({
        error: "Shipment not found"
      });
    }

    res.json(shipment);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch shipment"
    });
  }
};

const createShipment = async (req, res) => {

  try {

    const {
      order_id,
      warehouse_id,
      agent_id,
      vehicle_id,
      status
    } = req.body;

    const result =
      await shipmentService.createShipment(
        order_id,
        warehouse_id,
        agent_id,
        vehicle_id,
        status
      );

    res.status(201).json({
      message: "Shipment created",
      shipmentId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create shipment"
    });
  }
};

module.exports = {
  getShipments,
  getShipment,
  createShipment
};