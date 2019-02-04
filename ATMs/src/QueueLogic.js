import EventEmitter from './EventEmitter'

function QueueLogic () {
  EventEmitter.call(this)
  this.numUsers = 1
}

QueueLogic.prototype = Object.create(EventEmitter.prototype)
QueueLogic.prototype.constructor = QueueLogic

QueueLogic.prototype.queueIncrease = function () {
  this.numUsers += 1
  this.Change_count()
}

QueueLogic.prototype.Not_empty = function (min, max) {
  this.emit('send_message', min, max)
}

QueueLogic.prototype.Change_count = function () {
  this.emit('change_count')
}

QueueLogic.prototype.queueDecrease = function () {
  this.numUsers -= 1
  this.Change_count()
}

export default QueueLogic
