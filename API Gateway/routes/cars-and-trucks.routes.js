const router = require('express').Router();
const AllRoutes = require('../controller/cars&trucksController');

router.get('/', AllRoutes.getAll);

module.exports = router;