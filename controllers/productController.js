const productService = require('../services/productService');

const productController = {
  async listProducts(_req, res) { 
    const products = await productService.listProducts();
    res.status(200).json(products);
  },
  async findById(req, res) { 
    const { id } = req.params;
    const product = await productService.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  },
  async create(req, res) {
    const data = await productService.validateBodyAdd(req.body);
    const id = await productService.create(data);
    const item = await productService.findById(id);
    res.status(201).json(item);
  },
};

module.exports = productController;