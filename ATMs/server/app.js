const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const atms = require('./routes/api/atm')
const db = require('./config/keys').mongoURI

const app = express()

mongoose
  .connect(db)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch(err => { console.log(err) })

app.use(morgan('short'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api/atm', atms)

app.get('/', (req, res) => {
  console.log('Responding to root route')
  res.send('hello from rootsssssssssss!!!!!!!!!!!! ')
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is up and listening on ${port}`)
})
