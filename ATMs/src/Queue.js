import Component from './component'
import QueueLogic from './QueueLogic'

function Queue () {
  Component.call(this)
  this.core = new QueueLogic()
}

Queue.prototype = Object.create(Component.prototype)
Queue.prototype.constructor = Queue

Queue.prototype.render = function () {
  return `<p id="user-count">${this.core.numUsers}</p>`
}

export default Queue
