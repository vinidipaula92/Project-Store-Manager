const checkSalesProductId = require('../helpers/checkId');
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
  async delete(req, res) {
    const { id } = req.params;
    const sale = await salesService.delete(id);
    if (sale.affectedRows === 0) return res.status(404).json({ message: 'Sale not found' });
    res.status(204).json(sale);
  },
  async add(req, res) {
    const sale = req.body;
    const check = await checkSalesProductId(sale);

    if (!sale[0].productId) return res.status(400).json({ message: '"productId" is required' });
    if (sale[0].quantity <= 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!sale[0].quantity) return res.status(400).json({ message: '"quantity" is required' });
    if (!check) return res.status(404).json({ message: 'Product not found' });

    const newSale = await salesService.add(sale);
    res.status(201).json(newSale);
  },
};

module.exports = salesController;