// import randomNumber from './randomNumber'

function QueueLogic () {
  this.numUsers = 15 // почему 15? а если сервер пришлет 30, ты тут будешь менять?)
}

// let interval

QueueLogic.prototype.increment = function () {
  // return new Promise((resolve, reject) => {
  //   const that = this
  //   that.changeState('user-count', that.numUsers)
  //   interval = setInterval(() => {
  this.numUsers += 1
  this.changeState('user-count', this.numUsers)
  console.log(`Number of users in queue = ${this.numUsers}`)
    //   resolve(that.numUsers)
    // }, randomNumber(min, max) * 1000)
  }
// QueueLogic.prototype.clearInterval = function () {
//   clearInterval(interval)
// }

// опять в логике документ присутствует) почему ты не используешь возможности EventEmiiter.
// Он специально создан для того, чтобы связывать между собой различные сущности в приложении
QueueLogic.prototype.changeState = function (id, value) {
  document.getElementById(id).innerHTML = value
}

export default QueueLogic
