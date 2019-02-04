import EventEmitter from './EventEmitter'

function ATMLogic (id) {
  EventEmitter.call(this)
  this.id = id
  this.countUsers = 0
  this.isWork = true
  this.isFree = true
}
ATMLogic.prototype = Object.create(EventEmitter.prototype)
ATMLogic.prototype.constructor = ATMLogic
ATMLogic.prototype.incrementUsers = function () {
  this.countUsers += 1
}
ATMLogic.prototype.EmitFree = function () {
  this.incrementUsers()
  this.isFree = true
  this.emit('free')
}
ATMLogic.prototype.EmitBusy = function () {
  this.isFree = false
  this.emit('busy')
}
ATMLogic.prototype.EmitAddPerson = function () {
  this.emit('add_person')
}
ATMLogic.prototype.DeleteATM = function () {
  this.isWork = false
}
ATMLogic.prototype.UpdateData = function () {
  this.emit('update_data', this.EmitFree())
}

export default ATMLogic
