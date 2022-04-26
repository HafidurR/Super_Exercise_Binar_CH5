const successResponse = (res, result) => {
  return res.status(200).json({
    status: 'success',
    data: result
  })
}
 
const successCreateResponse = (res, result) => {
  return res.status(201).json({
    status: 'success',
    data: result
  })
}

const successUpdateResponse = (res, result) => {
  return res.status(200).json({
    status: 'success',
    message: 'success update data',
    data: result
  })
}

const successDeleteResponse = (res) => {
  return res.status(200).json({
    status: 'success',
    message: 'Data has succesfully deleted'
  })
}
 
const notFoundResponse = (res) => {
  return res.status(404).json({
    status: 'error',
    message: 'Data not found'
  })
}

const badRequestResponse = (res, message) => {
  return res.status(400).json({
    status: 'error',
    message
  })
}

const serverErrorResponse = (res, message) => {s
  return res.status(503).json({
    status: 'server error',
    message
  })
}

module.exports = {
  successCreateResponse,
  successDeleteResponse,
  successResponse,
  successUpdateResponse,
  badRequestResponse,
  serverErrorResponse,
  notFoundResponse
}