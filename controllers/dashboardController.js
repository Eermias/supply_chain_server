const dashboardService =
  require("../services/dashboardService");


// LOW STOCK
const lowStockProducts = async (
  req,
  res
) => {

  try {

    const data =
      await dashboardService
        .getLowStockProducts();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch low stock products"
    });
  }
};


// TOP PRODUCTS
const topProducts = async (
  req,
  res
) => {

  try {

    const data =
      await dashboardService
        .getTopProducts();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch top products"
    });
  }
};


// MONTHLY REVENUE
const monthlyRevenue = async (
  req,
  res
) => {

  try {

    const data =
      await dashboardService
        .getMonthlyRevenue();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch revenue analytics"
    });
  }
};


// TOP CUSTOMERS
const topCustomers = async (
  req,
  res
) => {

  try {

    const data =
      await dashboardService
        .getTopCustomers();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch top customers"
    });
  }
};


// SHIPMENT STATUS
const shipmentStatusStats = async (
  req,
  res
) => {

  try {

    const data =
      await dashboardService
        .getShipmentStatusStats();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch shipment stats"
    });
  }
};


// INVENTORY VALUE
const inventoryValue = async (
  req,
  res
) => {

  try {

    const data =
      await dashboardService
        .getInventoryValue();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch inventory value"
    });
  }
};

const getKPIs = async (
  req,
  res
) => {

  try {

    const data =
      await dashboardService
        .getKPIs();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch KPI data"
    });
  }
};


const recentOrders = async (
  req,
  res
) => {

  try {

    const data =
      await dashboardService
        .getRecentOrders();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch recent orders"
    });
  }
};


const recentShipments = async (
  req,
  res
) => {

  try {

    const data =
      await dashboardService
        .getRecentShipments();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch recent shipments"
    });
  }
};


module.exports = {
  lowStockProducts,
  topProducts,
  monthlyRevenue,
  topCustomers,
  shipmentStatusStats,
  inventoryValue,
  getKPIs,
  recentOrders,
  recentShipments
};