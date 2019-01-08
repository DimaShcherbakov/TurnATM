let counter = document.getElementById("user-count")
function Queue(){
    this.numUsers = 1;
}

Queue.prototype.increment = function(){
    setInterval(()=>{
        this.numUsers += 1 ;
        counter.innerHTML = this.numUsers;
    },randomNumber(1,2) * 1000);
}

Queue.prototype.decrement = function(){
    this.numUsers -= 1;
}

