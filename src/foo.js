let ATM1 = new ATM();
let ATM2 = new ATM();
let queue = new Queue();
let styled = new Render();

let timer;

queue.increment();

document.getElementById("btn").addEventListener("click",() => {
    arrATMs.push(new ATM());
    addEventsAll(arrATMs);
    addElements(arrATMs);
    addEventRemove(arrATMs);

    clearInterval(timer);
    WorkLoop(arrATMs);
    
    console.log(arrATMs);
})

let arrATMs = [ATM1, ATM2];

function addEventsAll(arr){
    arr.forEach((element, index) => {

        element.template = `<div class = "wrapper"><p id="atm${index}-counter">${element.countUsers}</p><div class = "atm" id ="atm-${index}"><span id = "remove-el-${index}">&times;</span></div></div>`;
       
        element.id = index;

        element.on("free", () => {
            element.changeState();
        });

        element.on("busy", () => {  
            if(queue.numUsers > 0 && element.isFree === true){
                element.changeState();
                queue.decrement();
                setTimeout(() => {
                    element.changeState();
                    element.incrementUsers();
                    document.getElementById(`atm${index}-counter`).innerHTML = element.countUsers;
                    console.log("count users:", element.countUsers);
                }, randomNumber(2,4) * 1000)
            }
        });
    });
}

addEventsAll(arrATMs);

function addElements(arr){
    document.getElementById('atms').innerHTML = '';
    arr.forEach((element) => {
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

            clearInterval(timer);
            WorkLoop(arrATMs);
        })
    })
}
addEventRemove(arrATMs);

function Timeout(arr,i){
    setTimeout(() => {
        (function(index) {
            arr[index].emit("busy");  
        })(i);
        Timeout(arr,i);
    },1000);
}

function WorkLoop(arr){
    
    for (let i = 0; i < arr.length; i++){
        if(queue.numUsers > 0 && arr[i].isFree === true){
            Timeout(arr, i);
        }
    }   
}
WorkLoop(arrATMs);