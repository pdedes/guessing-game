
$(document ).ready(function() {
    
    newGame = new Game();

    $("#checkGuessButton").on("click", function (event) {
        event.stopPropagation();
        var guessValue = parseInt($("#playerguess").val(), 10);
        $("#playerguess").val("");
        newGame.checkGuess(guessValue);
        $("#guessCount").html(newGame.totalTries-newGame.numTries);
        $("#pastAttempts").html(newGame.pastGuesses.join(", "));
    });

    $("#restart").on("click", function (event) {
        newGame.resetGame();
        $("#guessCount").html(newGame.totalTries-newGame.numTries);
        $("#pastAttempts").html(newGame.pastGuesses.join(", "));
        $("#gameResult").html("New Game Started").fadeIn(500).fadeOut(4000); //Only works once?
        $(".jumbotron").css({"background-color": "#EEEEEE" });
        
    });

    $("#hint").on("click", function (event) {
        $("#gameResult").html("The answer was, " + newGame.target + ".").fadeIn(500).fadeOut(4000);
        newGame.resetGame();
        $("#guessCount").html(newGame.totalTries-newGame.numTries);
        $("#pastAttempts").html(newGame.pastGuesses.join(", "));
    });

    $("#playerguess").on("keyup", function (event) {
        if (event.keyCode === 13) {
            var guessValue = parseInt($("#playerguess").val(), 10);
            $("#playerguess").val("")
            newGame.checkGuess(guessValue);
            $("#guessCount").html(newGame.totalTries-newGame.numTries);
            $("#pastAttempts").html(newGame.pastGuesses.join(", "));
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
                $("#gameResult").html("You Lose ;-P! New Game starts Now...").fadeIn(500).fadeOut(5000);
                $(".jumbotron").css({"background-color": "#FFCCCF" });
            } else if (this.guess !== this.target) { 
                this.pastGuesses.push(this.guess);
                this.notify();
            } else {
                this.resetGame();
                $("#gameResult").html("You Guessed the Number!").fadeIn(500).fadeOut(5000);
                $(".jumbotron").css({"background-color": "#CFFADD" });
            }

        } else {
            $("#gameResult").html("You Lose ;-P! New Game starts Now...").fadeIn(500).fadeOut(5000);
            $(".jumbotron").css({"background-color": "#FC9FA4" });
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
            if (intPositive) {$clue.html("You're very hot! Guess higher.").fadeIn(700).fadeOut(2000);} 
            else {$clue.html("You're very hot! Guess lower.").fadeIn(700).fadeOut(2000);}
        } else if (distance >=10 && distance < 20) {
            if (intPositive) {$clue.html("You're getting warmer. Guess higher.").fadeIn(700).fadeOut(2000);} 
            else {$clue.html("You're getting warmer. Guess lower.").fadeIn(700).fadeOut(2000);}
        } else {
            if (intPositive) {$clue.html("You're ice cold... guess higher!").fadeIn(700).fadeOut(2000);} 
            else {$clue.html("You're ice cold... guess lower!").fadeIn(700).fadeOut(2000);}
        }
        return console.log("You have " + (this.totalTries - this.pastGuesses.length) + " guesses remaining.");
    },

    resetGame: function () {
        newGame = new Game(); 
    }
}

function Game () {
    this.target = Math.floor(Math.random()*100)+1;
    this.guess = 0;
    this.numTries = 0;
    this.pastGuesses = [];
}

Game.prototype = gameProto;
