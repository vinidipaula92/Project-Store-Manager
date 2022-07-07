const salesModel = require('../models/salesModels');

const salesService = {
  async listSales() {
    const sales = await salesModel.getSales();
    return sales;
  },
  async findById(id) {
    const sale = await salesModel.findById(id);
    if (!sale) return null;
    return sale;
  },
  async delete(id) {
    const sale = await salesModel.delete(id);
    return sale;
  },
  async add(data) {
    const sale = await salesModel.add(data);
    return sale;
  },
  async checkIsExists(id) {
    const exists = await salesModel.exists(id);
    return exists;
  },
};

module.exports = salesService;