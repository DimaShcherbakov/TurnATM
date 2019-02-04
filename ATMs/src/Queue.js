import Component from './component'
import QueueLogic from './QueueLogic'

function Queue () {
  Component.call(this)
  this.core = new QueueLogic()
  this.core.on('change_count', () => {
    this.changeCount()
  })
}

Queue.prototype = Object.create(Component.prototype)
Queue.prototype.constructor = Queue

Queue.prototype.changeCount = function () {
  document.getElementById('user-count').innerHTML = this.core.numUsers
}
Queue.prototype.render = function () {
  return `<p id="user-count">${0}</p>`
}

export default Queue
