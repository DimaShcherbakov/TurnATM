function ATM(){
    Component.apply(this, arguments);
    this.countUsers = 0;
    this.isFree = true;
}

ATM.prototype = Object.create(Component.prototype);
ATM.prototype.constructor = ATM;

ATM.prototype.incrementUsers = function(){
    this.countUsers = this.countUsers + 1;
}

ATM.prototype.changeState = function(){
    this.isFree = !this.isFree;
}


