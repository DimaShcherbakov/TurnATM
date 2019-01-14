function EventEmitter() {
    this.eventTable = {};
}

EventEmitter.prototype.on = function(event, callback) {
    if(this.eventTable[event] == undefined){
	    this.eventTable[event] = [];
	    this.eventTable[event].push(callback);
     }else{
    	this.eventTable[event].push(callback);
     }
}

EventEmitter.prototype.emit = function(event, additionalParam) {
    this.eventTable[event].forEach((element) => {
	    element(additionalParam);
    }) 
}

export default EventEmitter ;