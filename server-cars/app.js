require('dotenv').config();
const express     = require('express');
const morgan      = require('morgan');
const app         = express();
const port        = process.env.PORT || 4000;
const cars        = require('./routes/cars.routes');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cars', cars);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

// module.exports = app;
