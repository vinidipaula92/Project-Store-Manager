const { Router } = require('express');
const productController = require('../controllers/productController');

const productRoute = Router();

productRoute.get('/', productController.listProducts);
productRoute.get('/:id', productController.findById);
productRoute.post('/', productController.create);
// productRoute.put('/:id', async (req, res) => { });
productRoute.delete('/:id', productController.delete);

module.exports = productRoute;