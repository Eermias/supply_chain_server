const vehicleService =
  require("../services/vehicleService");

const getVehicles = async (req, res) => {

  try {

    const vehicles =
      await vehicleService.getAllVehicles();

    res.json(vehicles);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch vehicles"
    });
  }
};

const getVehicle = async (req, res) => {

  try {

    const { id } = req.params;

    const vehicle =
      await vehicleService.getVehicleById(id);

    if (!vehicle) {

      return res.status(404).json({
        error: "Vehicle not found"
      });
    }

    res.json(vehicle);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch vehicle"
    });
  }
};

const createVehicle = async (req, res) => {

  try {

    const {
      registration_number,
      type,
      capacity
    } = req.body;

    const result =
      await vehicleService.createVehicle(
        registration_number,
        type,
        capacity
      );

    res.status(201).json({
      message: "Vehicle created",
      vehicleId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create vehicle"
    });
  }
};

module.exports = {
  getVehicles,
  getVehicle,
  createVehicle
};