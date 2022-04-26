const routes = require('express').Router();
const cars = require('../controller/carsController');

routes.get('/', cars.getAll);
routes.get('/:id', cars.getByID);
routes.post('/', cars.create);
routes.put('/:id', cars.update);
routes.delete('/:id', cars.delete);

module.exports = routes;