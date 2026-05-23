const purchaseOrderService =
  require("../services/purchaseOrderService");

const getPurchaseOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await purchaseOrderService
        .getAllPurchaseOrders();

    res.json(orders);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch purchase orders"
    });
  }
};

const getPurchaseOrder = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    const order =
      await purchaseOrderService
        .getPurchaseOrderById(id);

    if (!order) {

      return res.status(404).json({
        error:
          "Purchase order not found"
      });
    }

    res.json(order);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch purchase order"
    });
  }
};

const createPurchaseOrder = async (
  req,
  res
) => {

  try {

    const {
      supplier_id,
      warehouse_id,
      status,
      items
    } = req.body;

    const poId =
      await purchaseOrderService
        .createPurchaseOrder(
          supplier_id,
          warehouse_id,
          status,
          items
        );

    res.status(201).json({
      message:
        "Purchase order created",
      purchaseOrderId: poId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  getPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder
};