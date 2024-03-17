const express = require('express')
const router = express()

const repeatersController = require('../controllers/repeaters')
const validation = require('../middleware/validate')

router.get('/', repeatersController.getAll)

router.get('/:id', repeatersController.getSingle)

router.post('/', validation.saveRepeater, repeatersController.createRepeater)

router.put('/:id', validation.saveRepeater, repeatersController.updateRepeater)

router.delete('/:id', repeatersController.deleteRepeater)

module.exports = router
