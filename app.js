const express = require("express");
const cors = require("cors");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const warehouseRoutes = require("./routes/warehouseRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const customerRoutes = require("./routes/customerRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const agentRoutes = require("./routes/agentRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const contactRoutes = require("./routes/contactRoutes");
const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/supplier-contacts", contactRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);


app.get("/", (req, res) => {
  res.send("Supply Chain API Running...");
});

const db = require("./config/db");

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1");

    res.json({
      message: "Database connected",
      rows
    }); 
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    //   error: "Database connection failed"
    });
  }
});

module.exports = app;