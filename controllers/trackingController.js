const trackingService =
  require("../services/trackingService");

const getTracking = async (req, res) => {

  try {

    const { shipmentId } = req.params;

    const tracking =
      await trackingService
        .getTrackingByShipmentId(
          shipmentId
        );

    res.json(tracking);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch tracking"
    });
  }
};

const createTracking = async (req, res) => {

  try {

    const {
      shipment_id,
      location,
      status_update
    } = req.body;

    const result =
      await trackingService
        .createTrackingUpdate(
          shipment_id,
          location,
          status_update
        );

    res.status(201).json({
      message: "Tracking update created",
      trackingId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create tracking update"
    });
  }
};

module.exports = {
  getTracking,
  createTracking
};