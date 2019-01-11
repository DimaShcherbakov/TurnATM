let counter = document.getElementById("user-count");

function Queue(){
    this.numUsers = 1;
}

Queue.prototype.increment = function(){
    setInterval(()=>{
        this.numUsers += 5 ;
        counter.innerHTML = this.numUsers;
    },randomNumber(1,4) * 1000);
}

Queue.prototype.decrement = function(){
    this.numUsers = this.numUsers - 1;
}

