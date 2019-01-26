import axios from 'axios'
import ATM from './ATM'
import Queue from './Queue'
import randomNumber from './randomNumber'

const ATMparent = document.getElementById('atms')
const Queueparent = document.getElementById('counter')
const BtnAddATM = document.getElementById('btn')
const BtnAddInterval = document.getElementById('add-interval')
const inputMin = document.getElementById('input1')
const inputMax = document.getElementById('input2')

const queue = new Queue()
// example------------------->

const getBreeds = async () => {
  try {
    console.log(await axios.get('http://localhost:5000/api/atm'))
  } catch (error) {
    console.error(error)
  }
}
getBreeds()
// ---------------------->
const arrayATMs = [new ATM(0), new ATM(1)]
let newArr = []
let min
let max
BtnAddInterval.addEventListener('click', () => {
  min = inputMin.value
  max = inputMax.value
  if ((min === '' && max === '') || (min === '0' && max === '0')) {
    if ((min === '' && max === '0') || (min === '0' && max === '')) {
      console.log('Wrong value')
    }
  } else {
    clearInterval(interval)
    queueLoop(min, max)
    queue.core.changeState('user-count', queue.core.numUsers)
    console.log('OK')
  }
})

function RenderingATMs () {
  newArr = arrayATMs.map((item, index) => {
    item.on('CloseComponent_Click', () => {
      item.core.isWork = false
      const parent = document.getElementById('atms')
      const child = document.getElementById(`wrapATM${index}`)
      parent.removeChild(child)
    })
    AddEvents(item)
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

function AddEvents (element) {
  element.on('CloseComponent_Click', () => {
    const parent = document.getElementById('atms')
    const child = document.getElementById(`wrapATM${element.id}`)
    parent.removeChild(child)
    element.core.isWork = false
  })

  element.core.on('busy', () => {
    element.core.isFree = false
    element.core.countUsers += 1
    queue.core.numUsers -= 1
    console.log(`ATM ${element.id} serviced: `, element.core.countUsers)
    setTimeout(() => {
      element.core.emit('free')
      element.core.changeState(`atm${element.id}-counter`, `Users served: ${element.core.countUsers}`)
      element.core.changeColor(`atm-${element.id}`, 'green')
    }, randomNumber(2, 4) * 1000)
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
  ATMparent.appendChild(element.element)
}

function AddATM () {
  const newATM = new ATM(newArr.length)
  AddEvents(newATM)
}

BtnAddATM.addEventListener('click', () => {
  AddATM()
})
