const salesService = require('../services/salesService');

const salesController = {
  async listSales(req, res) {
    const sales = await salesService.listSales();
    res.status(200).json(sales);
  },
  async findById(req, res) {
    const { id } = req.params;
    const sales = await salesService.findById(id);
    if (sales.length === 0) return res.status(404).json({ message: 'Sale not found' });
    res.status(200).json(sales);
  },
  async create(req, res) {
    const { sales } = req.body;
    const saleId = await salesService.create(sales);
    res.status(200).json(saleId);
  },
};

module.exports = salesController;