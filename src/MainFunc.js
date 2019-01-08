let users = document.getElementById("user-count");
let countAtm1Users = document.getElementById("atm1-counter");
let countAtm2Users = document.getElementById("atm2-counter");
let atm1 = document.getElementById("atm-1");
let atm2 = document.getElementById("atm-2");

let ATM1 = new ATM();
let ATM2 = new ATM();
let queue = new Queue();
let styled = new Render();
queue.increment();

function eventHandler(typeATM, element, count){
    styled.setColor(element,"green");//------------
    typeATM.changeState();
    setTimeout(() => {
        if(queue.countUsers != 0 && typeATM.isFree === false ){
            queue.decrement();
            typeATM.incrementUsers();
            typeATM.changeState();
            styled.setColor(element,"red");
            styled.setCount(count,typeATM.countUsers)//-----------
            console.log(`${typeATM}is free`,"count = ", typeATM.countUsers, typeATM.isFree) ;
        }
    },randomNumber(1,3)*1000);
}

ATM1.on("free", () => {
    console.log("ATM is free")
});

ATM1.on("busy",() => {
    eventHandler(ATM1,atm1,countAtm1Users);
});
    
ATM2.on("free", () => {
    console.log("ATM is free")
});

ATM2.on("busy",() => {
    eventHandler(ATM2,atm2,countAtm2Users);
});

function workLoop(){
    setInterval(() => {
        if (queue.countUsers != 0 ){
        if(ATM1.isFree && ATM2.isFree){
            ATM1.emit("busy");
            ATM2.emit("busy");
        }else if(ATM1.isFree === false && ATM2.isFree === false){
            ATM1.emit("free")
            ATM2.emit("free")
        }else if(ATM1.isFree && ATM2.isFree === false){
            ATM1.emit("busy")
        }else if(ATM2.isFree && ATM1.isFree === false){
            ATM2.emit("busy")
        }
    }else {
        ATM1.emit("free");
        ATM2.emit("free");
    }
        
    },1000);
}
workLoop();