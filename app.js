const express = require("express");
const cors = require("cors");

const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

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