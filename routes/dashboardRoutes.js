const express = require("express");

const router = express.Router();

const {
  lowStockProducts,
  topProducts,
  monthlyRevenue,
  topCustomers,
  shipmentStatusStats,
  inventoryValue,
  getKPIs,
  recentOrders,
  recentShipments
} = require(
  "../controllers/dashboardController"
);

router.get(
  "/low-stock",
  lowStockProducts
);

router.get(
  "/top-products",
  topProducts
);

router.get(
  "/monthly-revenue",
  monthlyRevenue
);

router.get(
  "/top-customers",
  topCustomers
);

router.get(
  "/shipment-status",
  shipmentStatusStats
);

router.get(
  "/inventory-value",
  inventoryValue
);

router.get("/kpis", getKPIs);

router.get(
  "/recent-orders",
  recentOrders
);

router.get(
  "/recent-shipments",
  recentShipments
);

module.exports = router;