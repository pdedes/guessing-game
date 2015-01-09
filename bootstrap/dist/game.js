var gameProto = {
    state: 0, //0 = new game, 1 = game in progress
    target: 0, //this is where the number to be guessed is stored
    notifyCold: function () {console.log("You're ice cold... guess again!");},
    notifyWarm: function () {
        var distance = Math.abs(target-guess);
        if (distance < 10){
            console.log("You're very hot!");
        }
        else (distance >=10 && distance < 30) {
            console.log("You're getting warmer...");
        }
    },
    numTries = 0, //Store the number of attempts
}

function Game {
    this.target = Math.floor(Math.random()*100)+1;
}

Game.prototype = gameProto;

newGame = new Game("newGame");