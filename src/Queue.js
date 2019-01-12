import randomNumber from './randomNumber'
import SetColor from './Render'

let timer;
let drawing = new SetColor();

function Queue(){
    this.numUsers = 2;
}

Queue.prototype.increment = function(min, max){
    timer = setInterval(()=>{
        this.numUsers += 2 ;
        drawing.setCount(document.getElementById("user-count"), this.numUsers);
    },randomNumber(min,max) * 1000);
}

Queue.prototype.clearInterval = function(){
    clearInterval(timer);
}

Queue.prototype.decrement = function(){
    this.numUsers = this.numUsers - 1;
}

export default Queue;

