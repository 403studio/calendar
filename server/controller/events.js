const { Event, Sequelize } = require('../model')

module.exports = {
  async create(req, res) {
   try {
     const event = await Event.create(req.body)
     res.send({
       code: 0,
       msg: 'success',
       data: event.toJSON()
     })
   } catch (e) {
      let errMsg = []
      if (e.errors) {
        e.errors.forEach(error => {
          errMsg.push(error.message)
        })
      }
      res.status(400).send({
        code: 400,
        msg: errMsg
      })
   }
  },
  async update(req, res) {
    const id = req.params.id
    try {
      const event = await Event.findByPk(id)
      await event.update(req.body)
      res.send({
        code: 0,
        msg: 'success',
        data: event.toJSON()
      })
    } catch (e) {
      let errMsg = []
      if (e.errors) {
        e.errors.forEach(error => {
          errMsg.push(error.message)
        })
      }
      res.status(400).send({
        code: 400,
        msg: errMsg
      })
    }
  },
  async get(req, res) {
    try {
      const events = await Event.findAll()
      res.send({
        code: 0,
        msg: 'success',
        data: events
      })
    } catch (e) {
      res.status(400).send({
        code: 400,
        msg: e.message
      })
    }
  }
}