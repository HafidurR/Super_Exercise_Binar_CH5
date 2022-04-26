require('dotenv').config();
const express     = require('express');
const morgan      = require('morgan');
const app         = express();
const port        = process.env.PORT || 5000;
const trucks        = require('./routes/trucks.routes');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/trucks', trucks);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

// module.exports = app;
