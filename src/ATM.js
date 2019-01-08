function ATM(){
    this.countUsers = 0;
    this.isFree = true;
    EventEmitter.apply(this, arguments);
}

ATM.prototype = Object.create(EventEmitter.prototype);

ATM.prototype.incrementUsers = function(){
    this.countUsers = this.countUsers + 1;
}

ATM.prototype.changeState = function(){
    this.isFree = !this.isFree;
}

