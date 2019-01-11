let counter = document.getElementById("user-count");
let timer;

function Queue(){
    this.numUsers = 2;
}

Queue.prototype.increment = function(min, max){
    timer = setInterval(()=>{
        this.numUsers += 5 ;
        counter.innerHTML = this.numUsers;
    },randomNumber(min,max) * 1000);
}

Queue.prototype.clearInterval = function(){
    clearInterval(timer);
}

Queue.prototype.decrement = function(){
    this.numUsers = this.numUsers - 1;
}

