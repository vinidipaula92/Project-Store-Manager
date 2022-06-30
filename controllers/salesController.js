const salesService = require("../services/salesService");

const salesController = {
  async listSales(req, res) {
    const sales = await salesService.listSales();
    res.status(200).json(sales);
  },
  async findById(req, res) {
    const { id } = req.params;
    const sales = await salesService.findById(id);
    res.status(200).json(sales);
  },
}

module.exports = salesController;