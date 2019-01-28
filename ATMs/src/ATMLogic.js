import EventEmitter from './EventEmitter'

// ты наследуешь от EventEmmiter, но нигде внутри логики не вызываешь emit. Зачем тогда наслодовать?
function ATMLogic () {
  EventEmitter.call(this)
  this.countUsers = 0
  this.isWork = true
  this.isFree = true
}
ATMLogic.prototype = Object.create(EventEmitter.prototype)
ATMLogic.prototype.constructor = ATMLogic

ATMLogic.prototype.incrementUsers = function () {
  this.countUsers++
}

// при чем тут документ к логическому атму
ATMLogic.prototype.changeColor = function (id, color) {
  document.getElementById(id).style.backgroundColor = color
}

ATMLogic.prototype.changeState = function (id, value) {
  document.getElementById(id).innerHTML = value
}

export default ATMLogic
