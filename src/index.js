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

function properties(el,i){
    
    el.template = `<div class = "wrapper"><p id="atm${i}-counter">${el.countUsers}</p><div class = "atm" id ="atm-${i}"><span id = "remove-el-${i}">&times;</span></div></div>`;
       
    el.id = i;

    el.on("free", () => {
        
    });

    el.on("busy", () => {  
            el.changeState();
            queue.decrement();
            drawing.setColor(document.getElementById(`atm-${i}`), "red");
            setTimeout(() => {
                el.changeState();
                el.incrementUsers();
                drawing.setCount(document.getElementById(`atm${i}-counter`), el.countUsers);
                console.log("count users:", el.countUsers);
                drawing.setColor(document.getElementById(`atm-${i}`), "green")
            }, randomNumber(2,4) * 1000)
    });
}

function addEventsAll(arr){
    arr.forEach((element, index) => {
        properties(element,index);
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
        if(queue.numUsers > 0 ){
            Timeout(arr, i);
        }
    }   
}
queue.increment(1,4);
WorkLoop(arrATMs);

    