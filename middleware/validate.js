const validator = require('../helpers/validate')

const saveRadio = (req, res, next) => {
  const validationRule = {
    make: 'required|string',
    model: 'required|string',
    partNumber: 'required|string',
    bands: 'required|string',
    watts: 'required|numeric',
    mode: 'required|string',
    price: 'required|numeric'
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      })
    } else {
      next()
    }
  })
}

const saveRepeater = (req, res, next) => {
  const validationRule = {
    location: 'required|string',
    county: 'required|string',
    callSign: 'required|string',
    frequency: 'required|numeric',
    toneUp: 'string',
    toneDown: 'string',
    modes: 'required|string',
    updated: 'required|date',
    status: 'required|string'
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      })
    } else {
      next()
    }
  })
}

module.exports = {
  saveRadio,
  saveRepeater
}
