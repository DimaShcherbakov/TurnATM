function QueueLogic() {
  this.numUsers = 10;
}

QueueLogic.prototype.increment = function () {
  const that = this;
  setInterval(() => {
    that.numUsers++;
    that.changeState('user-count', that.numUsers);
    console.log(`Number of users in queue = ${that.numUsers}`);
  }, 2000);
};

QueueLogic.prototype.changeState = function (id, value) {
  document.getElementById(id).innerHTML = value;
};

export default QueueLogic;
