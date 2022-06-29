const Joi = require('joi');
const productModel = require('../models/productModel');
const { runSchema } = require('./validators');

const productService = {
  validaParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().required(),
  })),

  validateBodyEdit: runSchema(Joi.object({
    name: Joi.string().required(),
  })),
  async listProducts() {
    const products = await productModel.getProducts();
    return products;
  },
  async findById(id) { 
    const product = await productModel.findById(id);
    return product;
  },
  async create(product) {
    const id = await productModel.create(product);
    return id;
  },
};

module.exports = productService;