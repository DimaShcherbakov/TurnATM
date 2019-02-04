import Component from './component'
function Form () {
  Component.call(this)
}

Form.prototype = Object.create(Component.prototype)
Form.prototype.constructor = Form

Form.prototype.render = function () {
  return `<div class="form">
            <div class="inputs">
                <input type="number" class="type" id="input1" placeholder="min num">
                <span>&mdash;</span>
                <input type="number" class="type" id="input2" placeholder="max num">
            </div>
            <button class="btn" id="add-interval">Load Interval to queue</button>
            <button class="btn" id="btn">Add ATM</button>
          </div>`
}

export default Form
