import Queue from './Queue'
import ATM from './ATM'
import SetColor from './Render'
import randomNumber from './randomNumber'

let ATM1 = new ATM();
let ATM2 = new ATM();
let queue = new Queue();
let drawing = new SetColor();


document.getElementById("btn").addEventListener("click",() => {
    arrATMs.push(new ATM());
    // сколько у тебя коллбеков после каждого вызова у каждого АТМа?
    addEventsAll(arrATMs);
    addElements(arrATMs);
    addEventRemove(arrATMs);

    WorkLoop(arrATMs);
    
    console.log(arrATMs);
})

document.getElementById("add-interval").addEventListener("click",() => {
    let min = document.getElementById("input1").value;
    let max = document.getElementById("input2").value;
    queue.clearInterval();
    queue.increment(min,max);
})

let arrATMs = [ATM1, ATM2];

function addEventsAll(arr){
    arr.forEach((element, index) => {

        element.template = `<div class = "wrapper"><p id="atm${index}-counter">${element.countUsers}</p><div class = "atm" id ="atm-${index}"><span id = "remove-el-${index}">&times;</span></div></div>`;
       
        element.id = index;

        element.on("free", () => {
            
        });

        element.on("busy", () => {  
                element.changeState();
                queue.decrement();
                drawing.setColor(document.getElementById(`atm-${index}`), "red");
                setTimeout(() => {
                    element.changeState();
                    element.incrementUsers();
                    document.getElementById(`atm${index}-counter`).innerHTML = element.countUsers;
                    console.log("count users:", element.countUsers);
                    drawing.setColor(document.getElementById(`atm-${index}`), "green")
                }, randomNumber(2,4) * 1000)
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
    },5000);
}

function WorkLoop(arr){
    
    for (let i = 0; i < arr.length; i++){
        if(queue.numUsers > 0 && arr[i].isFree === true){
            Timeout(arr, i);
        }
    }   
}
queue.increment(1,4);
WorkLoop(arrATMs);

    