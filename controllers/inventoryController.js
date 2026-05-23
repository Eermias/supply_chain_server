const inventoryService =
  require("../services/inventoryService");

const getInventory = async (req, res) => {

  try {

    const inventory =
      await inventoryService.getInventory();

    res.json(inventory);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch inventory"
    });
  }
};

const createInventory = async (req, res) => {

  try {

    const {
      warehouse_id,
      product_id,
      quantity
    } = req.body;

    await inventoryService.createInventory(
      warehouse_id,
      product_id,
      quantity
    );

    res.status(201).json({
      message: "Inventory created"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create inventory"
    });
  }
};

const updateInventory = async (req, res) => {

  try {

    const {
      warehouse_id,
      product_id,
      quantity
    } = req.body;

    const result =
      await inventoryService.updateInventory(
        warehouse_id,
        product_id,
        quantity
      );

    if (result.affectedRows === 0) {

      return res.status(404).json({
        error: "Inventory record not found"
      });
    }

    res.json({
      message: "Inventory updated"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to update inventory"
    });
  }
};

module.exports = {
  getInventory,
  createInventory,
  updateInventory
};