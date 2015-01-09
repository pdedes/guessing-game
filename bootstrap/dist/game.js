var gameProto = {
    state: 0, //0 = new game, 1 = game in progress
    guess: 0
    target: 0, //this is where the number to be guessed is stored
    numTries: 0, //Store the number of attempts

    
    checkGuess: function (num) {
        while(num < 1 && num > 100) {
            console.log("outside bounds...");
            return 1;
        } 
        
        if (num !== this.target) {

        } else {
            
        }
    },
    notify: function () {
        var distance = Math.abs( this.target - this.guess );
        if (distance < 10) {
            console.log("You're very hot!");
        } else if (distance >=10 && distance < 30) {
            console.log("You're getting warmer...");
        } else {

            console.log("You're ice cold... guess again!");
        }
    },
}

function Game {
    this.target = Math.floor(Math.random()*100)+1;
}

Game.prototype = gameProto;

newGame = new Game("newGame");