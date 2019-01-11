function EventEmitter() {
    this.eventTable = {};
}

EventEmitter.prototype.on = function(event, callback) {
    this.eventTable[event] = callback;
}

EventEmitter.prototype.emit = function(event, additionalParam) {
    this.eventTable[event](additionalParam);
}
