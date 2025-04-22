const {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} = require('../services/product_services');

module.exports = {
  createProduct: async (req, res) => {
    try {
      const product = await createProductService({ body: req.body, files: req.files });
      res.status(201).json({ success: true, message: product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await getAllProductsService();
      res.status(200).json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  getProductById: async (req, res) => {
    try {
      const product = await getProductByIdService(req.params.id);
      if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
      res.status(200).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const updatedProduct = await updateProductService(req.params.id, { body: req.body, files: req.files });
      res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const message = await deleteProductService(req.params.id);
      res.status(200).json({ success: true, message });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
