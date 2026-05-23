const productService =
  require("../services/productService");

const getProducts = async (req, res) => {
  try {

    const products =
      await productService.getAllProducts();

    res.json(products);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch products"
    });
  }
};

const getProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const product =
      await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found"
      });
    }

    res.json(product);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch product"
    });
  }
};

const createProduct = async (req, res) => {
  try {

    const {
      category_id,
      name,
      unit_price,
      reorder_level
    } = req.body;

    const result =
      await productService.createProduct(
        category_id,
        name,
        unit_price,
        reorder_level
      );

    res.status(201).json({
      message: "Product created",
      productId: result.insertId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create product"
    });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct
};