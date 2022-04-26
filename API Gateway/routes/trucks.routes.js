const routes = require('express').Router();
const trucks = require('../controller/trucksController');

routes.get('/', trucks.getAll);
routes.get('/:id', trucks.getByID);
routes.post('/', trucks.create);
routes.put('/:id', trucks.update);
routes.delete('/:id', trucks.delete);

module.exports = routes;