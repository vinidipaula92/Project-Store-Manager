const salesError = async (req, res, next) => {
  const { id } = req.params;
  const { sales } = req.body;
  if (id === '') return res.status(400).json({ message: '"productId" is required' });
  if (sales.quantity === '') return res.status(400).json({ message: '"quantity" is required' });
  if (sales.quantity.length <= 0) {
    return res
      .status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (!id) return res.status(404).json({ message: 'Product not found' });
  next();
};

module.exports = salesError;