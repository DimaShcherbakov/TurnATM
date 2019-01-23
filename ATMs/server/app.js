const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('short'))

app.get('/', (req, res) => {
  console.log('Responding to root route')
  res.send('hello from roots!!!!!!!!!!!! ')
})

app.get('/users', (req, res) => {
  let user1 = { firstName: "Stephen", lastName: "Curry" }
  const user2 = { firstName: "Kevin", lastName: "Speed" }
  res.json([user1, user2])
  // res.send('Nodemon  auto updates when I save this file')
})

app.listen(3001, () => {
  console.log('Server is up and listening on 3001')
})
