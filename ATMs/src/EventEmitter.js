function EventEmitter () {
  this.eventTable = {}
}

EventEmitter.prototype = {
  on (eventName, callback) {
    if (!this.eventTable[eventName]) {
      this.eventTable[eventName] = []
    }
    this.eventTable[eventName].push(callback)
  },
  emit (eventName, ...params) {
    if (!this.eventTable[eventName]) return
    this.eventTable[eventName].forEach(callback => callback.apply(this, params))
  }
}

export default EventEmitter
