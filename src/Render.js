function Render(){
    this.setColor = function (element,key){
        switch(key){
            case "red": element.style.backgroundColor = "red";break;
            case "green": element.style.backgroundColor = "green";break;
            default: "red";
        }
    }
    this.setCount = function(element, number){
        element.innerHTML = number;
    }
}