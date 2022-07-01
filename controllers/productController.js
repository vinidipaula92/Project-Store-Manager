const productService = require('../services/productService');

const productController = {
  async listProducts(_req, res) {
    const products = await productService.listProducts();
    res.status(200).json(products);
  },
  async findById(req, res) {
    const { id } = req.params;
    const [product] = await productService.findById(id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  },
  async create(req, res) {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
      return res.status(422)
        .json({ message: '"name" length must be at least 5 characters long' });
    }
    const [{ insertId }] = await productService.create(name);
    const [item] = await productService.findById(insertId);
    return res.status(201).json(item);
  },
  async delete(req, res) {
    const { id } = req.params;
    const [product] = await productService.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const item = await productService.delete(id);
    return res.status(204).json(item);
  },
  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    if (name.length < 5) {
      return res.status(422)
        .json({ message: '"name" length must be at least 5 characters long' });
    }
    await productService.update(id, name);
    const [product] = await productService.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(200).json(product);
  },
};

module.exports = productController;