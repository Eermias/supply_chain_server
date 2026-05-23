const customerService =
  require("../services/customerService");

const getCustomers = async (req, res) => {

  try {

    const customers =
      await customerService.getAllCustomers();

    res.json(customers);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch customers"
    });
  }
};

const getCustomer = async (req, res) => {

  try {

    const { id } = req.params;

    const customer =
      await customerService.getCustomerById(id);

    if (!customer) {

      return res.status(404).json({
        error: "Customer not found"
      });
    }

    res.json(customer);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch customer"
    });
  }
};

const createCustomer = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      address
    } = req.body;

    const result =
      await customerService.createCustomer(
        name,
        email,
        phone,
        address
      );

    res.status(201).json({
      message: "Customer created",
      customerId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create customer"
    });
  }
};

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer
};