import EventEmitter from './EventEmitter'

function Controller (){
    EventEmitter.apply(this, arguments)
    this.isFree = true;
    this.served = 0;
}

Controller.prototype = EventEmitter.prototype;
Controller.prototype.constructor = Controller;

Controller.prototype.increment = function(){
    this.served++
}
Comtroller.prototype.changeStatus = function(){
    this.isFree = !this.isFree;
}

export default Controller;
