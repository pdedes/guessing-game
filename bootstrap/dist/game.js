var gameProto = {
    guess: 0,
    target: 0, //store number
    numTries: 0,
    pastGuesses: [], //Store all previous attempts

    
    checkGuess: function (num) {
        this.guess = num;
        while (this.guess < 1 || this.guess > 100) {
            console.log("outside bounds...");
            this.guess = prompt("Your guess is not between 1 to 100.")
        }
        if (this.guess !== this.target) {
            this.numTries++;
            this.pastGuesses.push(this.guess);
            this.notify();
        } else {
            console.log("You win!")
        }
    },
    
    notify: function () {
        var distance = Math.abs( this.target - this.guess );
        if (distance < 10) {
            console.log("You're very hot!");
        } else if (distance >=10 && distance < 20) {
            console.log("You're getting warmer...");
        } else {
            console.log("You're ice cold... guess again!");
        }
    },
}

function Game () {
    this.target = Math.floor(Math.random()*100)+1;
    this.numTries = 0;
}

Game.prototype = gameProto;

newGame = new Game("newGame");