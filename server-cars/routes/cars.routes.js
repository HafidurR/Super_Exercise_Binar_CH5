const routes = require('express').Router();
const carsRoute = require('../controller/carsController');

routes.get('/', carsRoute.getAll);
routes.get('/:id', carsRoute.getById);
routes.post('/', carsRoute.create);
routes.put('/:id', carsRoute.update);
routes.delete('/:id', carsRoute.delete);

module.exports = routes;