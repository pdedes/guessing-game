var gameProto = {
    guess: 0, //Last guess by player
    target: 0, //store game target to be guessed
    numTries: 0, //Guess counter
    totalTries: 5, //Number of guesses allowed before game is over
    pastGuesses: [], //Store all previous attempts

    //Main game function evaluates player's guess.
    checkGuess: function (num) {
        this.guess = num;
        while (this.guess < 1 || this.guess > 100) {
            console.log("outside bounds...");
            this.guess = +(prompt("Your guess is not between 1 to 100."));
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
        //Calculate distance & determine positivity, then determine absolute distance
        var distance = this.target - this.guess;
        var intPositive = distance > 0 ? true : false;
        distance = Math.abs(distance);

        //This determines distance from the target, and informs player to guess in the correct direction (pos or neg)
        if (distance < 10) {
            if (intPositive) {console.log("You're very hot! Guess higher.");} 
            else {console.log("You're very hot! Guess lower.");}
        } else if (distance >=10 && distance < 20) {
            if (intPositive) {console.log("You're getting warmer. Guess higher.");} 
            else {console.log("You're getting warmer. Guess lower.");}
        } else {
            if (intPositive) {console.log("You're ice cold... guess higher!");} 
            else {console.log("You're ice cold... guess lower!");}
        }
        console.log("You have " + (this.totalTries - this.pastGuesses.length) + " guesses remaining.")
    },
}

//Setting 'this' for the Game prototype and initialized values.
function Game () {
    this.target = Math.floor(Math.random()*100)+1;
    this.numTries = 0;
}

//Assigning inheritance.
Game.prototype = gameProto;

//Declaring a new game.
newGame = new Game("newGame");