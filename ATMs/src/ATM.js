import CloseComponent from './CloseComponent'
import Component from './component'
import ATMLogic from './ATMLogic'

function ATM (id) {
  this.closeBtn = new CloseComponent(id)
  this.core = new ATMLogic()
  this.closeBtn.on('CloseComponent_Click', () =>
    this.emit('CloseComponent_Click')
  )
  this.id = id
  Component.call(this)
  this.element.appendChild(this.closeBtn.element)
}

ATM.prototype = Object.create(Component.prototype)
ATM.prototype.constructor = ATM

ATM.prototype.render = function () {
  return `<div id="wrapATM${this.id}">
                <p id="atm${this.id}-counter">${this.core.countUsers}</p>
                <div class = "atm" id ="atm-${this.id}"></div>
            </div>`
}

export default ATM
