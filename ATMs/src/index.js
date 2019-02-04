import Queue from './Queue'
import ATM from './ATM'
import Form from './Form'
import randomNumber from './randomNumber'
import axios from 'axios'

const PARENT_ATMS = document.getElementById('atms')
const PARENT_FORM = document.getElementById('root')
const PARENT_QUEUE = document.getElementById('counter')

let form = new Form()
let queue = new Queue()
let arrayATMs = []
let countATMs = 1
let interval = null

PARENT_FORM.appendChild(form.element)
PARENT_QUEUE.appendChild(queue.element)

document.getElementById('btn').addEventListener('click', () => {
  let newATM = new ATM(arrayATMs.length)
  arrayATMs.push(newATM)
  PARENT_ATMS.appendChild(newATM.element)
  AllEvents(newATM, arrayATMs.length)
  newATM.core.EmitAddPerson()
})

document.getElementById('add-interval').addEventListener('click', () => {
  let min = document.getElementById('input1').value
  let max = document.getElementById('input2').value
  if (max > min) {
    clearInterval(interval)
    queue.core.Not_empty(min, max)
  } else {
    console.log('wrong value')
  }
})

document.addEventListener('DOMContentLoaded', ready)

function ready () {
  CreateATMs(countATMs)
  queue.core.Not_empty(1, 1)
  AddEvents()
  setTimeout(() => {
    work()
  }, 1000)
}

queue.core.on('send_message', (min, max) => {
  interval = setInterval(() => {
    queue.core.queueIncrease()
    console.log(queue.core.numUsers)
  }, randomNumber(min, max) * 1000)
})

function CreateATMs (num) {
  for (let i = 0; i < num; i++) {
    let item = new ATM(i)
    arrayATMs.push(item)
    PARENT_ATMS.appendChild(item.element)
  }
}

function work () {
  arrayATMs.map(element => {
    element.core.EmitAddPerson()
  })
}

let Timeout = function (element) {
  if (queue.core.numUsers > 0 && element.core.isFree === true && element.core.isWork === true) {
    setTimeout(() => {
      queue.core.queueDecrease()
      element.core.EmitBusy()
      setTimeout(() => {
        element.core.UpdateData()
        Timeout(element)
      }, randomNumber(2, 4) * 1000)
    }, 1000)
  } else {
    setTimeout(() => {
      Timeout(element)
    }, randomNumber(1, 3) + 2000)
  }
}

function AllEvents (element, index) {
  console.log(element)
  element.on('CloseComponent_Click', () => {
    // DELETE URL: http://localhost:5000/api/atm/data/ATM + id
    axios
      .delete(`http://localhost:5000/api/atm/data/ATM${element.id}`)
      .then(res => {
        element.core.DeleteATM()
        PARENT_ATMS.removeChild(element.element)
      })
      .catch(err => console.log(err))
  })

  element.on('Show_Popup', () => {
    element.popup.core.EmitShow()
    console.log(`wrapATM${element.id}`)
  })

  element.core.on('add_person', () => {
    Timeout(element)
  })
  element.core.on('update_data', (fn) => {
    // PUT URL: http://localhost:5000/api/atm/data
    axios
      .put('http://localhost:5000/api/atm/data', {
        id: `ATM${index}`,
        counter: element.core.countUsers
      })
      .then(res => fn)
      .catch(err => console.log(err))
  })
  // POST URL: http://localhost:5000/api/atm/data
  axios
    .post('http://localhost:5000/api/atm/data', {
      id: `ATM${index}`,
      counter: element.core.countUsers
    })
    .then(res => console.log(res))
    .catch(err => {
      console.log(err)
      axios
        .get('http://localhost:5000/api/atm')
        .then(res => {
          // console.log(res)
          let count = res.data[element.id].counter
          element.core.countUsers = count
        })
        .catch(err => console.log(err))
    })
}

function AddEvents () {
  arrayATMs.map((element, index) => {
    AllEvents(element, index)
  })
}
