const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { sequelize } = require('./model')
const port = process.env.PORT || 3001

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

require('./router')(app)

sequelize
  .sync()
  .then(() => console.log('Datebase connection has been established.'))
  .then(() => {
    app.listen(port, () => console.log(`The server has started on port ${port}`))
  })
  .catch(err => {
    console.log('Error has happened: ', err)
  })