require('dotenv').config();
const { URL_SERVICES_CARS, URL_SERVICES_TRUCKS } = process.env;
const apiAdaptor = require('./apiAdaptor');
const api = apiAdaptor(URL_SERVICES_CARS);
const api2 = apiAdaptor(URL_SERVICES_TRUCKS);

class carstrucksController {
  static getAll = async (req, res) => {
    try {
      const { page, limit } = req.query;
      const car = await api.get(`/cars?page=${page}&limit=${limit}`).then((data) => data.data);
      const truck = await api2.get(`/trucks?page=${page}&limit=${limit}`).then((data) => data.data);
      res.status(200).json({
        responseCar: car.data,
        responseTruck: truck.data,
      });
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({
          status: 'error',
          message: 'service cars unavailable'
        })
      }
    }
  }
}

module.exports = carstrucksController;
