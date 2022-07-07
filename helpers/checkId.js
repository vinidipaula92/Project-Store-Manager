const productService = require('../services/productService');

const checkSalesProductId = async (sale) => {
  const productsList = await productService.listProducts();
  for (let index = 0; index < sale.length; index += 1) {
    const product = productsList.find((prod) => prod.id === sale[index].productId);
    if (!product) return false;
  }
  return true;
};

module.exports = checkSalesProductId;