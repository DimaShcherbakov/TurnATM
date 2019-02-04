import CloseComponent from './CloseComponent'
import Component from './component'
import ATMLogic from './ATMLogic'
import Popup from './Popup'

function ATM (id) {
  this.id = id
  this.color = 'green'
  this.closeBtn = new CloseComponent(this.id)
  this.core = new ATMLogic(this.id)
  this.popup = new Popup(this.id)
  this.closeBtn.on('CloseComponent_Click', () =>
    this.emit('CloseComponent_Click')
  )
  Component.call(this)
  this.element.addEventListener('click', this.handleClick.bind(this))
  this.element.appendChild(this.closeBtn.element)
  this.element.appendChild(this.popup.element)

  this.core.on('free', () => {
    console.log(`ATM${this.core.id} serviced ${this.core.countUsers}`)
    this.color = 'green'
    this.changeColor()
  })

  this.core.on('busy', () => {
    this.color = 'red'
    this.changeColor()
  })
}

ATM.prototype = Object.create(Component.prototype)
ATM.prototype.constructor = ATM

ATM.prototype.handleClick = function () {
  this.emit('Show_Popup')
}

ATM.prototype.changeColor = function () {
  let template = this.render()
  let temp = this.strToDOM(template)
  this.element.innerHTML = temp.innerHTML
  this.element.appendChild(this.closeBtn.element)
  this.element.appendChild(this.popup.element)
}

ATM.prototype.render = function () {
  return `<div id="wrapATM${this.id}">
            <p class = "speech" id="atm${this.id}-counter"> Users served: ${this.core.countUsers}</p>
            <div class = "atm">
              <div class = "display" id ="atm-${this.id}" style="background-color:${this.color}"></div>
            </div>
          </div>`
}

export default ATM
