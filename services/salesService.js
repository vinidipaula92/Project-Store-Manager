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
  // async create(sales) {
  //   const saleId = await salesModel.create(sales);
  //   return saleId;
  // },
  async delete(id) {
    const sale = await salesModel.delete(id);
    return sale;
  },
  async update(id) {
    const sale = await salesModel.update(id);
    return sale;
  },
};

module.exports = salesService;