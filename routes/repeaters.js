const express = require('express')
const router = express()

const repeatersController = require('../controllers/repeaters')
const validation = require('../middleware/validate')
const { isAuthenticated } = require("../middleware/authenticate")

router.get('/', repeatersController.getAll)

router.get('/:id', repeatersController.getSingle)

router.post('/', isAuthenticated, validation.saveRepeater, repeatersController.createRepeater)

router.put('/:id', isAuthenticated, validation.saveRepeater, repeatersController.updateRepeater)

router.delete('/:id', isAuthenticated, repeatersController.deleteRepeater)

module.exports = router
