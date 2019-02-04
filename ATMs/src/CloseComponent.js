import Component from './component'

function CloseComponent (id) {
  Component.call(this)
  this.id = id
  this.element.addEventListener('click', this.handleClick.bind(this))
}

CloseComponent.prototype = Object.create(Component.prototype)
CloseComponent.prototype.constructor = CloseComponent

CloseComponent.prototype.render = function () {
  return `<span id="close_btn">&times;</span>`
}

CloseComponent.prototype.handleClick = function () {
  this.emit('CloseComponent_Click')
}

export default CloseComponent
