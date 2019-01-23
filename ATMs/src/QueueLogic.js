import randomNumber from './randomNumber'

function QueueLogic () {
  this.numUsers = 15
}

let interval

QueueLogic.prototype.increment = function (min, max) {
  const that = this
  that.changeState('user-count', that.numUsers)
  interval = setInterval(() => {
    that.numUsers += 1
    that.changeState('user-count', that.numUsers)
    console.log(`Number of users in queue = ${that.numUsers}`)
  }, randomNumber(min, max) * 1000)
}

QueueLogic.prototype.clearInterval = function () {
  clearInterval(interval)
}

QueueLogic.prototype.changeState = function (id, value) {
  document.getElementById(id).innerHTML = value
}

export default QueueLogic
