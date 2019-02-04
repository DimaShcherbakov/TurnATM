import EventEmitter from './EventEmitter'

function Component () {
  // function strToDOM (htmlString) {
  //   const [
  //     ,
  //     openTag,
  //     content
  //   ] = /<(.*?|(?:.*?\n)+.*?)>(.*?|(?:.*?\n)+.*?)<\/.+?>/.exec(htmlString)
  //   const tagName = /\w+/.exec(openTag)
  //   const element = document.createElement(tagName)
  //   const reParams = /([\w|-]+)="(.*?|(?:.*?\n?)+.*?)"/g
  //   let reParamsExecResult
  //   while ((reParamsExecResult = reParams.exec(openTag))) {
  //     element.setAttribute(reParamsExecResult[1], reParamsExecResult[2])
  //   }
  //   element.innerHTML = content.trim()
  //   return element
  // }
  EventEmitter.call(this)
  this.element = this.strToDOM(this.render())
}

Component.prototype = Object.create(EventEmitter.prototype)
Component.prototype.constructor = Component

Component.prototype.strToDOM = function (htmlString) {
  const [
    ,
    openTag,
    content
  ] = /<(.*?|(?:.*?\n)+.*?)>(.*?|(?:.*?\n)+.*?)<\/.+?>/.exec(htmlString)
  const tagName = /\w+/.exec(openTag)
  const element = document.createElement(tagName)
  const reParams = /([\w|-]+)="(.*?|(?:.*?\n?)+.*?)"/g
  let reParamsExecResult
  while ((reParamsExecResult = reParams.exec(openTag))) {
    element.setAttribute(reParamsExecResult[1], reParamsExecResult[2])
  }
  element.innerHTML = content.trim()
  return element
}
export default Component
