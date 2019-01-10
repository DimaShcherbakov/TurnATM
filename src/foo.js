// let users = document.getElementById("user-count");
// let countAtm1Users = document.getElementById("atm1-counter");
// let countAtm2Users = document.getElementById("atm2-counter");
// let atm1 = document.getElementById("atm-1");
// let atm2 = document.getElementById("atm-2");

let ATM1 = new ATM();
let ATM2 = new ATM();
let queue = new Queue();
let styled = new Render();

queue.increment();

document.getElementById("btn").addEventListener("click",() => {
    arrATMs.push(new ATM());
    addEventsAll(arrATMs);
    addElements(arrATMs);
    addEventRemove(arrATMs)
    console.log(arrATMs)
})

let arrATMs = [ATM1, ATM2];

function addEventsAll(arr){
    arr.forEach((element, index) => {

        element.template = `<div class = "wrapper"><p id="atm${index}-counter">${element.countUsers}</p><div class = "atm" id ="atm-${index}"><span id = "remove-el-${index}">&times;</span></div></div>`;
       
        element.id = index;

        element.on("free", () => {
            console.log(ATM1)
            element.changeState();
            console.log(ATM1);
        });

        element.on("busy", () => {  
            if(queue.numUsers > 0){
                element.changeState();
                queue.decrement();
                setTimeout(() => {
                    element.changeState();
                    element.incrementUsers();
                    console.log("count users:", element.countUsers)
                },randomNumber(1,3) * 1000)
            }
        });
        
    });
}

addEventsAll(arrATMs);

function addElements(arr){
    document.getElementById('atms').innerHTML = '';
    arr.forEach((element) => {
        console.log(element)
        element.render("atms",element.template);
    })
}
addElements(arrATMs);

function addEventRemove(arr){
    arr.forEach((element, index) => {
            document.getElementById(`remove-el-${index}`).addEventListener("click", () => {
            arr.splice(index,1);
            console.log("Event added for span with id :" + `remove-el-${index}`);
            addEventsAll(arrATMs);
            addElements(arrATMs);
            addEventRemove(arrATMs);
        })
    })
}
addEventRemove(arrATMs);

// setInterval(() => {
//     arrATMs[0].emit("busy");
// },1000)
