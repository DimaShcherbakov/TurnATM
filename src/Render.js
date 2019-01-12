function SetColor(){
    this.setColor = function (element,key){
        element.style.backgroundColor = key;
    }
    this.setCount = function(element, number){
        element.innerHTML = number;
    }
}

export default SetColor ;