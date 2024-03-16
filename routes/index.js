const router = require('express').Router()

router.use('/', require('./swagger'))

router.get('/', (req, res) => {
  // swagger.tags=['Hello World']
  res.send('Hello World')
})

router.use('/radios', require('./radios'))

router.use('/repeaters', require('./repeaters'))

module.exports = router
