import ATM from './ATM';
import Queue from './Queue';
import randomNumber from './randomNumber';

const ATMparent = document.getElementById('atms');
const Queueparent = document.getElementById('counter');
const BtnAddATM = document.getElementById('btn');
const BtnAddInterval = document.getElementById('add-interval');

const queue = new Queue();

let el1;
let el2;
const arrayATMs = [el1, el2];

function RenderingATMs(arr) {
  arr.forEach((item, index) => {
    item = new ATM(index);

    item.on('CloseComponent_Click', () => {
      item.core.isWork = false;
      const parent = document.getElementById('atms');
      const child = document.getElementById(`wrapATM${index}`);
      parent.removeChild(child);
    });

    item.core.on('busy', () => {
      item.core.isFree = false;
      item.core.changeColor(`atm-${index}`, 'red');
      item.core.countUsers += 1;
      queue.core.numUsers -= 1;
      console.log(`ATM ${index} serviced:`, item.core.countUsers);
      setTimeout(() => {
        item.core.changeState(`atm${index}-counter`, item.core.countUsers);
        item.core.emit('free');
      }, randomNumber(2, 4) * 1000);
    });

    item.core.on('free', () => {
      item.core.isFree = true;
      item.core.changeColor(`atm-${index}`, 'green');
      if (queue.core.numUsers > 0 && item.core.isWork) {
        setTimeout(() => {
          item.core.emit('busy');
        }, 1000);
      } else if (item.core.isWork !== true) {
        console.log(`Element ATM${index} was deleted. Last num = ${item.core.countUsers}`);
      } else {
        console.log('queue is about nothing');
      }
    });

    console.log(item);
    ATMparent.appendChild(item.element);
    console.log(arrayATMs);
    item.core.emit('free');
  });
}

function RenderingQueue() {
  Queueparent.appendChild(queue.element);
  queue.core.increment();
}

RenderingATMs(arrayATMs);
RenderingQueue();

BtnAddATM.addEventListener('click', () => {
  const newATM = new ATM(arrayATMs.length);

  newATM.on('CloseComponent_Click', () => {
    const parent = document.getElementById('atms');
    const child = document.getElementById(`wrapATM${newATM.id}`);
    parent.removeChild(child);
    newATM.core.isWork = false;
  });

  newATM.core.on('busy', () => {
    newATM.core.isFree = false;
    newATM.core.countUsers += 1;
    queue.core.numUsers -= 1;
    console.log(`ATM ${newATM.id} serviced: `, newATM.core.countUsers);
    setTimeout(() => {
      newATM.core.emit('free');
      newATM.core.changeState(`atm${newATM.id}-counter`, newATM.core.countUsers);
      newATM.core.changeColor(`atm-${newATM.id}`, 'green');
    }, randomNumber(2, 4) * 1000);
  });

  newATM.core.on('free', () => {
    if (queue.core.numUsers > 0 && newATM.core.isWork) {
      setTimeout(() => {
        newATM.core.emit('busy');
        newATM.core.changeColor(`atm-${newATM.id}`, 'red');
      }, 1000);
    } else if (newATM.core.isWork !== true) {
      console.log(`Element ATM${newATM.id} was deleted. Last num = ${newATM.core.countUsers}`);
    } else {
      console.log('queue is about nothing');
    }
  });
  newATM.core.emit('free');
  arrayATMs.push(newATM);
  ATMparent.appendChild(newATM.element);
});

console.log(queue.core.numUsers);

BtnAddInterval.addEventListener('click', () => {
  console.log('add-interval');
});
