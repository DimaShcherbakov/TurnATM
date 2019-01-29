function QueueLogic () {
  this.numUsers = 0
}

QueueLogic.prototype.increment = function () {
  this.numUsers += 1
  console.log(`Number of users in queue = ${this.numUsers}`)
}

this.emit()

export default QueueLogic
