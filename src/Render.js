function SetColor(){
    this.setColor = function (element,key){
<<<<<<< HEAD
        element.style.backgroundColor = key;
=======
        // а если цветов будет больше?
        switch(key){
            case "red": element.style.backgroundColor = "red";break;
            case "green": element.style.backgroundColor = "green";break;
            default: "red";
        }
>>>>>>> 77d19fb7147a6a6263731472795aedab1550fc39
    }
    this.setCount = function(element, number){
        element.innerHTML = number;
    }
}