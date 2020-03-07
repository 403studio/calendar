const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3001

const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

app.get('/', (req, res) => {
  res.send({
    code: 0,
    message: 'Hello world'
  })
})

app.listen(port, () => console.log(`The server has started on port ${port}`))