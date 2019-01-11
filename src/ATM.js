function ATM(){
    Component.apply(this, arguments);
    this.countUsers = 0;
    this.isFree = true;
<<<<<<< HEAD
}

ATM.prototype = Object.create(Component.prototype);
ATM.prototype.constructor = ATM;
=======
    Component.apply(this, arguments); // конструктор родителя нужно вызывать раньше добавления свойств потомка
}

ATM.prototype = Object.create(Component.prototype); // если конструктор не установишь на ATM,
// то плохо будет дальнейшее наследование работать
>>>>>>> 77d19fb7147a6a6263731472795aedab1550fc39

ATM.prototype.incrementUsers = function(){
    this.countUsers = this.countUsers + 1;
}

ATM.prototype.changeState = function(){
    this.isFree = !this.isFree;
}


