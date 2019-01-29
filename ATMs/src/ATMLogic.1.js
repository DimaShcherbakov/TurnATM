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

ATMLogic.on('Queue_is_not_null', () => {

})

ATMLogic.on('busy', () => {
  this.core.isFree = false
  this.incrementUsers()
      setTimeout(() => {
            this.emit('free')
          })
    // ---------------------------
    }, randomNumber(2, 4) * 1000)
  })
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
