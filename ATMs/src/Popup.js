import Component from './component'
import PopupLogic from './PopupLogic'
// import CloseComponent from './CloseComponent'

function Popup (id) {
  this.id = id
  this.core = new PopupLogic(this.id)
  // this.closeBtn = new CloseComponent()
  this.isShow = false
  this.display = 'none'
  Component.call(this)

  this.core.on('show_popup', () => {
    console.log('ok')
    this.display = 'block'
    this.changeState()
  })

  this.core.on('hide_popup', () => {
    this.display = 'none'
    this.changeState()
  })

  this.core.on('update_data', () => {
    this.changeState()
  })
}
Popup.prototype = Object.create(Component.prototype)
Popup.prototype.constructor = Popup

Popup.prototype.changeState = function () {
  console.log(this.element.innerHTML)
  let temp = this.strToDOM(this.render())
  console.log(temp.innerHTML)
  // this.element.innerHTML = temp.innerHTML
  // this.element.appendChild(this.closeBtn.element)
}

// Popup.prototype.render = function () {
//   return `<div id="popup" style="display:${this.display}">
//             <div>
//               <p id="popup-content">ATM${0}</p>
//               <p> CountUsers:${0} </p>
//             </div>
//           </div>`
// }
Popup.prototype.render = function () {
  return `<div id="popup" style="display:${this.display}">
            <div>
              <p id="popup-content">ATM${this.id}</p>
              <p> CountUsers:${this.core.countUsers} </p>
            </div>
          </div>`
}
export default Popup
