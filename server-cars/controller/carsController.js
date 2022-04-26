const { Car } = require('../models');
const response = require('../helper/response.utils');
const { Op } = require("sequelize");

class CarController {

  static getAll = async (req, res) => {
    const name = (req.query.name === undefined) ? "" : req.query.name;
    const limit = (req.query.limit === undefined) ? await Car.count() : req.query.limit;
    const page = (req.query.page === undefined) ? 1 : req.query.page;
    const options = {
      attributes: ['id', 'name', 'code', 'number_of_gears', 'number_of_tires'],
      where: {
        [Op.or]: {
          name: {
            [Op.like]: `%${name}%`
          }
        },
      },
      limit: parseInt(limit),
      offset: (parseInt(page) == 1) ? 0 : parseInt(limit) * parseInt(page) - parseInt(limit)
    }

    await Car.findAll(options)
      .then((result) => {
        return response.successResponse(res, result);
      })
      .catch((err) => {
        return response.badRequestResponse(res, err.message)
      })
  }

  static getById = async (req, res) => {
    const id = req.params.id;
    const option = {
      where: {
        id: id
      }
    }

    await Car.findOne(option)
      .then((result) => {
        if (result === null) {
          return response.notFoundResponse(res);
        } else {
          return response.successResponse(res, result)
        }
      })
      .catch((err) => {
        return response.badRequestResponse(res, err.message);
      })

  }

  static create = async (req, res) => {
    const { name, code, number_of_gears, number_of_tires } = req.body;

    await Car.create({
      name, code, number_of_gears, number_of_tires
    })
      .then((result) => {
        return response.successCreateResponse(res, result)
      })
      .catch((error) => {
        const err = error.errors
        const errorList = err.map(d => {
          let obj = {}
          obj[d.path] = d.message
          return obj;
        })
        return res.status(400).json({
          status: 'error',
          message: errorList
        })
      })
  }

  static update = async (req, res) => {
    const id = req.params.id;
    const { name, code, number_of_gears, number_of_tires } = req.body;
    const option = {
      where: {
        id: id
      }
    }

    await Car.findOne(option)
      .then(async (rsl) => {
        if (rsl === null) {
          return response.notFoundResponse(res);
        } else {
          await Car.update({
            name, code, number_of_gears, number_of_tires
          }, option)
            .then(async () => {
              await Car.findOne(option)
                .then((result) => {
                  return response.successUpdateResponse(res, result)
                })
                .catch((err) => {
                  return response.badRequestResponse(res, err.message);
                })
            })
            .catch((error) => {
              const err = error.errors
              const errorList = err.map(d => {
                let obj = {}
                obj[d.path] = d.message
                return obj;
              })
              return res.status(400).json({
                status: 'error',
                message: errorList
              })
            })
        }
      })
      .catch((err) => {
        return response.badRequestResponse(res, err.message);
      })
  }

  static delete = async (req, res) => {
    const id = req.params.id;
    const option = {
      where: {
        id: id
      }
    }

    await Car.findOne(option)
      .then(async (result) => {
        if (result === null) {
          return response.notFoundResponse(res)
        } else {
          await Car.destroy(option)
            .then(() => {
              return response.successDeleteResponse(res)
            })
            .catch((err) => {
              return response.badRequestResponse(res, err.message);
            })
        }
      })
  }

}

module.exports = CarController;