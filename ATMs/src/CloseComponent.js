import Component from './component';

function CloseComponent(ide) {
  Component.call(this);
  this.id = ide;
  this.element.addEventListener('click', this.handleClick.bind(this));
}

CloseComponent.prototype = Object.create(Component.prototype);
CloseComponent.prototype.constructor = CloseComponent;

CloseComponent.prototype.render = function () {
  return `<span id="${this.id}">&times;</span>`;
};

CloseComponent.prototype.handleClick = function () {
  this.emit('CloseComponent_Click');
};

export default CloseComponent;
