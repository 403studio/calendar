const express = require('express')
const EventsController = require('../controller/events')
const router = express.Router()

router.get('/', EventsController.get)
router.post('/', EventsController.create)
router.put('/:id', EventsController.update)

module.exports = router