import EventEmitter from './EventEmitter'

function Component(){
    EventEmitter.apply(this, arguments);
    this.template = "";
    this.id = 0;
}

Component.prototype = Object.create(EventEmitter.prototype);

Component.prototype.render = function(id, HTML){
    let root = document.getElementById(id);
    root.innerHTML += HTML;
}

Component.prototype.updateParams = function(arr,key){

}  

export default Component ;