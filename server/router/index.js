const events = require('./events')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({
      code: 0,
      message: 'Hello world'
    })
  })
  app.use('/events', events)
}