const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.get('/', salesController.listSales);
salesRoute.get('/:id', salesController.findById);
salesRoute.post('/', salesController.add);
// salesRoute.put('/:id', salesController.update);
salesRoute.delete('/:id', salesController.delete);

module.exports = salesRoute;