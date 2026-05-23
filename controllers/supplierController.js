const supplierService =
  require("../services/supplierService");

const getSuppliers = async (req, res) => {

  try {

    const suppliers =
      await supplierService.getAllSuppliers();

    res.json(suppliers);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch suppliers"
    });
  }
};

const getSupplier = async (req, res) => {

  try {

    const { id } = req.params;

    const supplier =
      await supplierService.getSupplierById(id);

    if (!supplier) {

      return res.status(404).json({
        error: "Supplier not found"
      });
    }

    res.json(supplier);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch supplier"
    });
  }
};

const createSupplier = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      address
    } = req.body;

    const result =
      await supplierService.createSupplier(
        name,
        email,
        phone,
        address
      );

    res.status(201).json({
      message: "Supplier created",
      supplierId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create supplier"
    });
  }
};

module.exports = {
  getSuppliers,
  getSupplier,
  createSupplier
};