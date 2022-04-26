require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 1000;
const cars = require('./routes/cars.routes');
const trucks = require('./routes/trucks.routes');
const AllRoutes = require('./routes/cars-and-trucks.routes');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/feugeseot/cars', cars);
app.use('/feugeseot/trucks', trucks);
app.use('/feugeseot/cars-and-truck', AllRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});