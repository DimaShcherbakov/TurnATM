let users = document.getElementById("user-count");
let countAtm1Users = document.getElementById("atm1-counter");
let countAtm2Users = document.getElementById("atm2-counter");
let atm1 = document.getElementById("atm-1");
let atm2 = document.getElementById("atm-2");
let textField = document.getElementById("textfield")

const randomNumber = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

let turn = {
    count: 5
}

class ATM {

    constructor(servicesTime,typeATM,countWrap){
        this.services = false;
        this.count = 0;
        countWrap.innerHTML = this.count;
        this.workLoop(servicesTime,typeATM,countWrap)
    }

    workLoop(servicesTime,typeATM,countWrap){
        setInterval(()=>{
            this.isWork(typeATM,countWrap);
            this.services = !this.services;
        }, servicesTime);
    }

    isWork(typeATM,countWrap){
        if(this.services == true){
            typeATM.style.backgroundColor = "green";
            if(turn.count !== 0){
                turn.count = turn.count - 1;
            }
            users.innerHTML = turn.count;
            this.count++;
            countWrap.innerHTML = this.count;
        }else{
            typeATM.style.backgroundColor = "red";
        }
    }
}

let ATM1 = new ATM(2000,atm1,countAtm1Users);
let ATM2 = new ATM(3000,atm2,countAtm2Users);

function counting(){
    users.innerHTML = turn.count;
    setInterval(() => {
        let rand = randomNumber(1,10);
        console.log(`was updated on ${rand} + ${turn.count}`)
        turn.count += rand;
        users.innerHTML = turn.count;
    },10000);
}
counting();