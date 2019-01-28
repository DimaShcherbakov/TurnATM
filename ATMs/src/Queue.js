import Component from './component'
import QueueLogic from './QueueLogic'

function Queue () {
  Component.call(this)
  this.core = new QueueLogic()
}

Queue.prototype = Object.create(Component.prototype)
Queue.prototype.constructor = Queue

// а почему бы не рендерить сразу с количеством человек из логической очереди? ты же в конструкторе ее создаешь.
Queue.prototype.render = function () {
  return `<p id="user-count">0</p>`
}

export default Queue
