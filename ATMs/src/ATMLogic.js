import EventEmitter from './EventEmitter'
import axios from 'axios'

function ATMLogic (id) {
  EventEmitter.call(this)
  this.countUsers = 0
  this.isWork = true
  this.isFree = true
  this.id = id
}
ATMLogic.prototype = Object.create(EventEmitter.prototype)
ATMLogic.prototype.constructor = ATMLogic

ATMLogic.prototype.incrementUsers = function () {
  this.countUsers++
}

// ATMLogic.prototype.changeColor = function (id, color) {
//   document.getElementById(id).style.backgroundColor = color
// }

ATMLogic.on('busy', () => {
  this.core.isFree = false
  this.core.countUsers += 1
  // PUT localhost:5000/api/atm/data
  axios
    .put('http://localhost:5000/api/atm/data', {
      id: `ATM${this.id}`,
      counter: this.countUsers
    })
    .then(res => {
      console.log(`ATM ${this.id} serviced: `, this.countUsers)
    })
    .then(res => {
      setTimeout(() => {
        // GET localhost:5000/api/atm
        axios.get('http://localhost:5000/api/atm')
          .then(res => {
            // console.log(res.data[element.id].counter)
            this.emit('free')
          })
          .catch(err => console.log('GET catch', err))
          // ---------------------------
      }, randomNumber(2, 4) * 1000)
    })
    .catch(err => console.log(err))
    // --------------------------------
})

ATMLogic.on('free', () => {
  setTimeout(() => {
    this.emit('busy')
  }, 1000)
})

// ATMLogic.prototype.changeState = function (id, value) {
//   document.getElementById(id).innerHTML = value
// }

export default ATMLogic
