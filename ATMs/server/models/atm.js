const mongoose = require('mongoose')

const ATMSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  counter: {
    type: Number,
    required: true
  }
})

let ATM = mongoose.model('atm', ATMSchema)

module.exports = ATM
