function Component(){
    this.template = "";
    this.id = 0;
    EventEmitter.apply(this, arguments);
}

Component.prototype = Object.create(EventEmitter.prototype);

Component.prototype.render = function(id, HTML, arr){
    let root = document.getElementById(id);
    // const as = root.innerHTML
    // root.innerHTML = '' 
    root.innerHTML += HTML;
}

Component.prototype.updateParams = function(arr,key){
    switch (key) {
        case "counter": ;break;
        case "atms": ;break;
    }
}  