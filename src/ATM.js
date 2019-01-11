function ATM(){
    this.countUsers = 0;
    this.isFree = true;
    Component.apply(this, arguments); // конструктор родителя нужно вызывать раньше добавления свойств потомка
}

ATM.prototype = Object.create(Component.prototype); // если конструктор не установишь на ATM,
// то плохо будет дальнейшее наследование работать

ATM.prototype.incrementUsers = function(){
    this.countUsers = this.countUsers + 1;
}

ATM.prototype.changeState = function(){
    this.isFree = !this.isFree;
}


