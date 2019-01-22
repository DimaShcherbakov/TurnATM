// import axios from 'axios';
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

const arrayATMs = [new ATM(0), new ATM(1)]
let newArr = []
let min
let max
BtnAddInterval.addEventListener('click', () => {
  min = inputMin.value
  max = inputMax.value
  if (min !== '' && max !== '') {
    if (min !== 0) {
      if (min !== 0 && max !== 0) {
        queue.core.clearInterval()
        queue.core.increment(min, max)
        queue.core.changeState('user-count', queue.core.numUsers)
      }
    }
  } else {
    console.log('Are you stupid???')
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

    item.core.on('busy', () => {
      item.core.isFree = false
      item.core.changeColor(`atm-${index}`, 'red')
      item.core.countUsers += 1
      queue.core.numUsers -= 1
      console.log(`ATM ${index} serviced:`, item.core.countUsers)
      setTimeout(() => {
        item.core.changeState(`atm${index}-counter`, `Users served: ${item.core.countUsers}`)
        queue.core.changeState('user-count', queue.core.numUsers)
        item.core.emit('free')
      }, randomNumber(2, 4) * 1000)
    })

    item.core.on('free', () => {
      item.core.isFree = true
      item.core.changeColor(`atm-${index}`, 'green')
      if (queue.core.numUsers > 0 && item.core.isWork) {
        setTimeout(() => {
          item.core.emit('busy')
        }, 1000)
      } else if (item.core.isWork !== true) {
        console.log(
          `Element ATM${index} was deleted. Last num = ${item.core.countUsers}`
        )
      } else {
        console.log('queue is about nothing')
        setTimeout(() => {
          item.core.emit('free')
        }, randomNumber(min, max) * 1000 + 5000)
      }
    })

    ATMparent.appendChild(item.element)
    item.core.emit('free')
  })
}

function RenderingQueue () {
  min = 1
  max = 4
  Queueparent.appendChild(queue.element)
  queue.core.increment(min, max)
}

RenderingATMs()
RenderingQueue()

BtnAddATM.addEventListener('click', () => {
  const newATM = new ATM(newArr.length)

  newATM.on('CloseComponent_Click', () => {
    const parent = document.getElementById('atms')
    const child = document.getElementById(`wrapATM${newATM.id}`)
    parent.removeChild(child)
    newATM.core.isWork = false
  })

  newATM.core.on('busy', () => {
    newATM.core.isFree = false
    newATM.core.countUsers += 1
    queue.core.numUsers -= 1
    console.log(`ATM ${newATM.id} serviced: `, newATM.core.countUsers)
    setTimeout(() => {
      newATM.core.emit('free')
      newATM.core.changeState(`atm${newATM.id}-counter`, `Users served: ${newATM.core.countUsers}`)
      newATM.core.changeColor(`atm-${newATM.id}`, 'green')
    }, randomNumber(2, 4) * 1000)
  })

  newATM.core.on('free', () => {
    if (queue.core.numUsers > 0 && newATM.core.isWork) {
      setTimeout(() => {
        newATM.core.emit('busy')
        newATM.core.changeColor(`atm-${newATM.id}`, 'red')
      }, 1000)
    } else if (newATM.core.isWork !== true) {
      console.log(
        `Element ATM${newATM.id} was deleted. Last num = ${
          newATM.core.countUsers
        }`
      )
    } else {
      console.log('queue is about nothing')
      setTimeout(() => {
        newATM.core.emit('free')
      }, randomNumber(min, max) * 1000 + 6000)
    }
  })
  newATM.core.emit('free')
  newArr.push(newATM)
  ATMparent.appendChild(newATM.element)
})
