function EventEmitter() {
    this.eventTable = {};
}

EventEmitter.prototype.on = function(event, callback) {
    this.eventTable[event] = callback;
}

EventEmitter.prototype.emit = function(event, additionalParam) {
    this.eventTable[event](additionalParam);
}
<<<<<<< HEAD
=======

// а почему эта функция в этом файле?
const randomNumber = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
>>>>>>> 77d19fb7147a6a6263731472795aedab1550fc39
