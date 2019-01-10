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
        styled.setColor(element,"red");//------------
        typeATM.changeState();
        queue.decrement();
        typeATM.incrementUsers();
        setTimeout(() => {
            styled.setColor(element,"green");
            styled.setCount(count,typeATM.countUsers)//-----------
            typeATM.changeState();
            console.log(`${typeATM}is free`,"count = ", typeATM.countUsers, typeATM.isFree) ;
        },randomNumber(1,3) * 1000);
}

ATM1.on("free", () => {
    ATM1.changeState();
    console.log("ATM is free")
});

ATM1.on("busy",() => {
    eventHandler(ATM1,atm1,countAtm1Users);
});
    
ATM2.on("free", () => {
    ATM2.changeState();
    console.log("ATM is free")
});

ATM2.on("busy",() => {
    eventHandler(ATM2,atm2,countAtm2Users);
});

function workLoop(){
    setInterval(() => {
        if(queue.numUsers > 0){
            if(ATM1.isFree){
                ATM1.emit("busy");
            }
            if(ATM1.isFree === false && 
                queue.numUsers >= 1){
                ATM2.emit("busy");
            }
        }
    },1000);
}
workLoop();
