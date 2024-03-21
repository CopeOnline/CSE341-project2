const express = require('express')
const router = express()

const radiosController = require('../controllers/radios')
const validation = require('../middleware/validate')
const { isAuthenticated } = require("../middleware/authenticate")

router.get('/', radiosController.getAll)

router.get('/:id', radiosController.getSingle)

router.post('/', isAuthenticated, validation.saveRadio, radiosController.createRadio)

router.put('/:id', isAuthenticated, validation.saveRadio, radiosController.updateRadio)

router.delete('/:id', isAuthenticated, radiosController.deleteRadio)

module.exports = router
