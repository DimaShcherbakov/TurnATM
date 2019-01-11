function EventEmitter() {
    this.eventTable = {};
}

EventEmitter.prototype.on = function(event, callback) {
    this.eventTable[event] = callback;
}

EventEmitter.prototype.emit = function(event, additionalParam) {
    this.eventTable[event](additionalParam);
}

// а почему эта функция в этом файле?
const randomNumber = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}