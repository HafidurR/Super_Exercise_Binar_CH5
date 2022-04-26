require('dotenv').config();
const { URL_SERVICES_TRUCKS } = process.env;

const apiAdaptor = require('./apiAdaptor');
const api = apiAdaptor(URL_SERVICES_TRUCKS);
const response = require('../helper/response.utils');

class trucksController {
  static getAll = async (req, res) => {
    try {
      const { page, limit } = req.query;
      await api.get(`/trucks?page=${page}&limit=${limit}`)
        .then((data) => {
          return res.status(200).json(data.data);
        })
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({
          status: 'error',
          message: 'service trucks unavailable'
        })
      }
    }
  }

  static getByID = async (req, res) => {
    try {
      await api.get(`/trucks/${req.params.id}`)
        .then((data) => {
          return res.status(200).json(data.data);
        })
        .catch((error) => {
          // return console.log(error);
          return response.badRequestResponse(res, error.message)
        })
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({
          status: 'error',
          message: 'service trucks unavailable'
        })
      } else {
        return response.notFoundResponse(res)
      }
    }
  }

  static create = async (req, res) => {
    try {
      const result = await api.post('/trucks', req.body);
      res.status(201).json(result.data);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({
          status: 'error',
          message: 'service trucks unavailable'
        })
      }
    }
  }

  static update = async (req, res) => {
    try {
      const result = await api.put(`/trucks/${req.params.id}`, req.body);
      res.json(result.data);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({
          status: 'error',
          message: 'service trucks unavailable'
        })
      } else {
        return response.notFoundResponse(res)
      }
    }
  }

  static delete = async (req, res) => {
    try {
      const result = await api.delete(`/trucks/${req.params.id}`, req.body);
      res.json(result.data);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        res.status(500).json({
          status: 'error',
          message: 'service trucks unavailable'
        })
      } else {
        return response.notFoundResponse(res)
      }
    }
  }

}

module.exports = trucksController;