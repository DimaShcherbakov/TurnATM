import EventEmitter from './EventEmitter'

function PopupLogic (id) {
  EventEmitter.call(this)
  this.id = id
  this.countUsers = 0
}
PopupLogic.prototype = Object.create(EventEmitter.prototype)
PopupLogic.prototype.constructor = PopupLogic

PopupLogic.prototype.ChangeCount = function (newCount) {
  this.countUsers = newCount
}

PopupLogic.prototype.EmitShow = function () {
  this.emit('show_popup')
}

PopupLogic.prototype.EmitHide = function () {
  this.emit('hide_popup')
}

PopupLogic.prototype.UpdateData = function () {
  this.emit('update_data')
}

export default PopupLogic
