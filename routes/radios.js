const express = require('express')
const router = express()

const radiosController = require('../controllers/radios')
const validation = require('../middleware/validate')

router.get('/', radiosController.getAll)

router.get('/:id', radiosController.getSingle)

router.post('/', validation.saveRadio, radiosController.createRadio)

router.put('/:id', validation.saveRadio, radiosController.updateRadio)

router.delete('/:id', radiosController.deleteRadio)

module.exports = router
