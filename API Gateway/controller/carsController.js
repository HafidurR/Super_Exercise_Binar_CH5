require('dotenv').config();
const { URL_SERVICES_CARS } = process.env;
const apiAdaptor = require('./apiAdaptor');
const api = apiAdaptor(URL_SERVICES_CARS);
const response = require('../helper/response.utils');

class carsController {
  static getAll = async (req, res) => {
    try {
      const { page, limit } = req.query;
      await api.get(`/cars?page=${page}&limit=${limit}`)
        .then((data) => {
          return res.status(200).json(data.data);
        })
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({
          status: 'error',
          message: 'service cars unavailable'
        })
      }
    }
  }

  static getByID = async (req, res) => {
    try {
      await api.get(`/cars/${req.params.id}`)
        .then((data) => {
          return res.status(200).json(data.data);
          // return console.log(data.data == 0); 
        }) 
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({
          status: 'error',
          message: 'service cars unavailable'
        })
      } else {
        return response.notFoundResponse(res)
      }
    }
  }

  static create = async (req, res) => {
    try {
      const result = await api.post('/cars', req.body);
      return res.status(201).json(result.data);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({
          status: 'error',
          message: 'service cars unavailable'
        })
      }
    }
  }

  static update = async (req, res) => {
    try {
      const result = await api.put(`/cars/${req.params.id}`, req.body);
      return res.status(200).json(result.data);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({
          status: 'error',
          message: 'service cars unavailable'
        })
      } else {
        return response.notFoundResponse(res)
      }
    }
  }

  static delete = async (req, res) => {
    try {
      const result = await api.delete(`/cars/${req.params.id}`, req.body);
      return res.status(200).json(result.data);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({
          status: 'error',
          message: 'service cars unavailable'
        })
      } else {
        return response.notFoundResponse(res)
      }
    }
  }

}

module.exports = carsController;