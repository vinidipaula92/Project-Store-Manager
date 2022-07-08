const saleUpdate = async (items, res, id, sale) => {
  if (items.length > 0) return res.json({ saleId: id, itemsUpdated: sale });
  return res.status(404).json({ message: 'Sale not found' });
};

module.exports = saleUpdate;