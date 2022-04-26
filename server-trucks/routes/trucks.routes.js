const routes = require('express').Router();
const truckRoute = require('../controller/trucksController');

routes.get('/', truckRoute.getAll);
routes.get('/:id', truckRoute.getById);
routes.post('/', truckRoute.create);
routes.put('/:id', truckRoute.update);
routes.delete('/:id', truckRoute.delete);

module.exports = routes;