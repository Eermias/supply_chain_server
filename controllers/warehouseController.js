const warehouseService =
  require("../services/warehouseService");

const getWarehouses = async (req, res) => {

  try {

    const warehouses =
      await warehouseService.getAllWarehouses();

    res.json(warehouses);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch warehouses"
    });
  }
};

const getWarehouse = async (req, res) => {

  try {

    const { id } = req.params;

    const warehouse =
      await warehouseService.getWarehouseById(id);

    if (!warehouse) {
      return res.status(404).json({
        error: "Warehouse not found"
      });
    }

    res.json(warehouse);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch warehouse"
    });
  }
};

const createWarehouse = async (req, res) => {

  try {

    const {
      name,
      location
    } = req.body;

    const result =
      await warehouseService.createWarehouse(
        name,
        location
      );

    res.status(201).json({
      message: "Warehouse created",
      warehouseId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create warehouse"
    });
  }
};

module.exports = {
  getWarehouses,
  getWarehouse,
  createWarehouse
};