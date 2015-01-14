

$(document ).ready(function() {
    
    newGame = new Game();
    // var updateTries = $("#guessCount").html(function () {
    //     debugger;
    //     var printTries = newGame.totalTries-newGame.numTries;
    //     return " " + printTries + " ";
    // });

    $("#checkGuessButton").on("click", function (event) {
        event.stopPropagation();
        var guessValue = parseInt($("#playerguess").val(), 10);
        $("#playerguess").val("");
        newGame.checkGuess(guessValue);
        $("#guessCount").html(newGame.totalTries-newGame.numTries);
    });
    // $("#guessCount").html("You have 5 attempts remaining.");
    $("#restart").on("mouseup", function (event) {
        newGame.resetGame();
        $("#guessCount").html(newGame.totalTries-newGame.numTries);
    });
    $("#hint").on("mouseup", function (event) {
        // Need to code this functionality
    });
    $("#playerguess").on("keyup", function (event) {
        if (event.keyCode === 13) {
            var guessValue = parseInt($("#playerguess").val(), 10);
            $("#playerguess").val("")
            newGame.checkGuess(guessValue);
            $("#guessCount").html(newGame.totalTries-newGame.numTries);
        }
    })

    $(".numbertry").fadeOut(10000).removeClass(".numbertry");
 
}); 

var gameProto = {
    guess: 0, //Last guess by player
    target: 0, //store game target to be guessed
    numTries: 0, //Guess counter
    totalTries: 5, //Number of guesses allowed before game is over
    pastGuesses: [], //Store all previous attempts

    //Main game function evaluates player's guess.
    checkGuess: function (num) {
        // this.guess = parseInt(document.getElementById("playerguess").value, 10);
        this.guess = num;
        if(this.numTries < this.totalTries) {
            this.numTries++;
            while (this.guess < 1 || this.guess > 100) {
                $("#clue").html("Your guess was out of bounds. Pick a number between 1 to 100.");
                console.log("outside bounds...");
                this.guess = +(prompt("Your guess is not between 1 to 100."));
            }
        
            if (this.guess !== this.target && this.numTries === this.totalTries) {
                this.resetGame();
                $("#clue").html("Sorry, you lost! New game starts now...");
            } else if (this.guess !== this.target) { 
                this.pastGuesses.push(this.guess);
                this.notify();
            } else {
                this.resetGame();
                $("#clue").html("You win!");
            }

        } else {
            $("#clue").html("Sorry, you lost! New game starts now...");
            this.resetGame();
        };
    },
    
    notify: function () {
        //Calculate distance & determine positivity, then determine absolute distance
        var distance = this.target - this.guess;
        var intPositive = distance > 0 ? true : false;
        distance = Math.abs(distance);
        $clue = $("#clue");

        //This determines distance from the target, and informs player to guess in the correct direction (pos or neg)
        if (distance < 10) {
            if (intPositive) {$clue.html("You're very hot! Guess higher.").fadeIn(700).fadeOut(3000);} 
            else {$clue.html("You're very hot! Guess lower.").fadeIn(700).fadeOut(3000);}
        } else if (distance >=10 && distance < 20) {
            if (intPositive) {$clue.html("You're getting warmer. Guess higher.").fadeIn(700).fadeOut(3000);} 
            else {$clue.html("You're getting warmer. Guess lower.").fadeIn(700).fadeOut(3000);}
        } else {
            if (intPositive) {$clue.html("You're ice cold... guess higher!").fadeIn(700).fadeOut(3000);} 
            else {$clue.html("You're ice cold... guess lower!").fadeIn(700).fadeOut(3000);}
        }
        return console.log("You have " + (this.totalTries - this.pastGuesses.length) + " guesses remaining.");
    },

    resetGame: function () {
        newGame = new Game(); 
    }
}

//Setting 'this' for the Game prototype and initialized values.
function Game () {
    this.target = Math.floor(Math.random()*100)+1;
    this.guess = 0;
    this.numTries = 0;
    this.pastGuesses = [];
}

//Assigning inheritance.
Game.prototype = gameProto;

//Declaring a new game.
