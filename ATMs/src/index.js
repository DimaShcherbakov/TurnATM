import axios from 'axios'
import ATM from './ATM'
import Queue from './Queue'
import randomNumber from './randomNumber'

// лучше отвязаться от первоначальной верстки в index.html как можно скорее. все компоненты на странице лучше рисовать динамически
const ATMparent = document.getElementById('atms')
const Queueparent = document.getElementById('counter')
const BtnAddATM = document.getElementById('btn')
const BtnAddInterval = document.getElementById('add-interval')
const inputMin = document.getElementById('input1')
const inputMax = document.getElementById('input2')

const queue = new Queue()

// а если изначально 10 АТМов придет от сервера?
const arrayATMs = [new ATM(0), new ATM(1)]
let newArr = []
let min
let max
BtnAddInterval.addEventListener('click', () => {
  min = inputMin.value
  max = inputMax.value
  if ((min === '' && max === '') || (min === '0' && max === '0')) {
    // у тебя когда-нибудь выполняется данное условие?
    if ((min === '' && max === '0') || (min === '0' && max === '')) {
      console.log('Wrong value')
    }
  } else {
    clearInterval(interval)
    queueLoop(min, max)
    queue.core.changeState('user-count', queue.core.numUsers)
  }
})

function RenderingATMs () {
  newArr = arrayATMs.map((item, index) => {
    // почему отдельно от остальных обработчиков?
    item.on('CloseComponent_Click', () => {
      item.core.isWork = false
      const parent = document.getElementById('atms')
      const child = document.getElementById(`wrapATM${index}`)
      parent.removeChild(child)
    })
    AddEvents(item, index)
  })
}

let interval

function queueLoop (min, max) {
  return new Promise((resolve, reject) => {
    const that = queue.core
    that.changeState('user-count', that.numUsers)
    interval = setInterval(() => {
      that.increment()
      if (that.numUsers === 15) {
        resolve(that.numUsers)
      }
    }, randomNumber(min, max) * 1000)
  })
}
function RenderingQueue () {
  min = 1
  max = 4
  Queueparent.appendChild(queue.element)
  queueLoop(min, max).then((data) => {
    AddATM()
  })
}

RenderingATMs()
RenderingQueue()

function AddEvents (element, index) {
  element.on('CloseComponent_Click', () => {
    const parent = document.getElementById('atms')
    const child = document.getElementById(`wrapATM${element.id}`)
    // DELETE localhost:5000/api/atm/data
    axios
      .delete(`http://localhost:5000/api/atm/data/ATM${element.id}`)
      .then(res => {
        console.log("Delete")
        parent.removeChild(child)
        element.core.isWork = false
      })
      .catch(err => console.log(err))
    // ----------------------------------
  })

  element.core.on('busy', () => {
    element.core.isFree = false
    element.core.countUsers += 1
    // PUT localhost:5000/api/atm/data
    axios
      .put('http://localhost:5000/api/atm/data', {
        id: `ATM${index}`,
        counter: element.core.countUsers
      })
      .then(res => {
        queue.core.numUsers -= 1
        console.log(`ATM ${element.id} serviced: `, element.core.countUsers)
      })
      .catch(err => console.log(err))
      .then(res => {
        setTimeout(() => {
          // GET localhost:5000/api/atm
          axios.get('http://localhost:5000/api/atm')
            .then(res => {
              // console.log(res.data[element.id].counter)
              // вот emit должен вызываться как раз таки в описании методов класса
              element.core.emit('free')
              element.core.changeState(`atm${element.id}-counter`, `Users served: ${res.data[element.id].counter}`)
              element.core.changeColor(`atm-${element.id}`, 'green')
            })
            .catch(err => console.log(err))
          // ---------------------------
        }, randomNumber(2, 4) * 1000)
      })
    // --------------------------------
  })

  element.core.on('free', () => {
    if (queue.core.numUsers > 0 && element.core.isWork) {
      setTimeout(() => {
        element.core.emit('busy')
        element.core.changeColor(`atm-${element.id}`, 'red')
      }, 1000)
    } else if (element.core.isWork !== true) {
      console.log(
        `Element ATM${element.id} was deleted. Last num = ${
          element.core.countUsers
        }`
      )
    } else {
      console.log('queue is about nothing')
      setTimeout(() => {
        element.core.emit('free')
      }, randomNumber(min, max) * 1000 + 6000)
    }
  })
  element.core.emit('free')
  newArr.push(element)
  // POST localhost:5000/api/atm/data
  console.log("OK")
  axios
    .post('http://localhost:5000/api/atm/data', {
      id: `ATM${index}`,
      counter: element.core.countUsers
    })
    .then(res => {
      console.log(res)
      ATMparent.appendChild(element.element)
    })
    .catch(err => {
      console.log(err)
      ATMparent.appendChild(element.element)
    })
  // --------------------------------
}

function AddATM () {
  const newATM = new ATM(newArr.length)
  AddEvents(newATM, newArr.length)
}

BtnAddATM.addEventListener('click', () => {
  AddATM()
})
