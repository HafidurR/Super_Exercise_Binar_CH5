const { Truck } = require('../models');
const response = require('../helper/response.utils');
const { Op } = require("sequelize");

class TruckController {

  static getAll = async (req, res) => {
    const name = (req.query.name === undefined) ? "" : req.query.name;
    const limit = (req.query.limit === undefined) ? await Truck.count() : req.query.limit;
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

    await Truck.findAll(options)
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

    await Truck.findOne(option)
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

    await Truck.create({
      name, code, number_of_gears, number_of_tires
    })
      .then((result) => {
        return response.successCreateResponse(res, result)
      })
      .catch((error) => {
        return response.badRequestResponse(res, error.message)
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

    await Truck.findOne(option)
      .then(async (rsl) => {
        if (rsl === null) {
          return response.notFoundResponse(res);
        } else {
          await Truck.update({
            name, code, number_of_gears, number_of_tires
          }, option)
            .then(async () => {
              await Truck.findOne(option)
                .then((result) => {
                  return response.successUpdateResponse(res, result)
                })
                .catch((err) => {
                  return response.badRequestResponse(res, err.message);
                })
            })
            .catch((error) => {
              return response.badRequestResponse(res, error.message)
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

    await Truck.findOne(option)
      .then(async (result) => {
        if (result === null) {
          return response.notFoundResponse(res)
        } else {
          await Truck.destroy(option)
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

module.exports = TruckController;