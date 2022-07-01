const productModel = require('../models/productModel');

const productService = {
  async listProducts() {
    const products = await productModel.getProducts();
    return products;
  },
  async findById(id) {
    const product = await productModel.findById(id);
    if (!product) return null;
    return product;
  },
  async create(product) {
    const id = await productModel.create(product);
    return id;
  },
  async delete(id) {
    const product = await productModel.delete(id);
    if (!product) return null;
    return product;
  },
  async update(id, product) {
    const updatedProduct = await productModel.update(id, product);
    if (!updatedProduct) return null;
    return updatedProduct;
  }
};

module.exports = productService;