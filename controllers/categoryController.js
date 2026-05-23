const categoryService = require("../services/categoryService");

const getCategories = async (req, res) => {
  try {
    const categories =
      await categoryService.getAllCategories();

    res.json(categories);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch categories"
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category =
      await categoryService.getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        error: "Category not found"
      });
    }

    res.json(category);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch category"
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const result =
      await categoryService.createCategory(
        name,
        description
      );

    res.status(201).json({
      message: "Category created",
      categoryId: result.insertId
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create category"
    });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory
};