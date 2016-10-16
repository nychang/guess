(function(){

/* **** Guessing Game Functions **** */

var winningNumber = pickWinningNumber();
var guessLimit = 5;
var	guessCount = 0;
var guessArray = [];


// Random integer generator.
function getRandomIntegerInclusive(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick winning number.
function pickWinningNumber(){
	return getRandomIntegerInclusive(1, 100);
}

// Fetch player's guess.
function fetchGuess() {
	var guess = +document.getElementById("players-guess").value;
	document.getElementById("players-guess").value = "";
	return guess;
}

// Validate guess: integer, within range, no repeats.
function validateGuess() {
	var guess = fetchGuess();
	var checkArray = [];
	checkArray.push(isUnique(guess));
	checkArray.push(isInteger(guess));
	checkArray.push(isInRange(1, 100, guess));
	if ( checkArray.every(isTrue) ) {
		guessArray.push(guess);
		logger(guess);
		checkpoint(guess);
		return true;
	} else {
		$("h2").text("A whole number from 1 through 100! No repeats homie!")
		return false;
	}
}

// Check if guess is a repeat.
function isUnique(num) {
	if (guessArray.length === 1) {
		return true;
	} else if (guessArray.indexOf(num) === -1) {
		return true;
	} else {
		return false;
	}
}

// Check if guess is an integer.
function isInteger(num) {
	return Number.isInteger(num);
}

// Check if guess is within range.
function isInRange(min, max, num) {
	if (num >= min && num <= max) {
		return true;
	} else {
		return false;
	}
}

// Check if value is true.
function isTrue(arg) {
	if (arg === true) {
		return true;
	}
}

// Log guesses.
function logger(num) {
	guessCount = guessLimit - guessArray.length;
	$("#guess-count").text(guessCount);
	$("#guess-list").text(guessArray);
}

// Check if guess is winning number.
function isWinningNumber(num){
	if (num === winningNumber) {
		return true;
	} else {
		return false;
	}
}

// Check if game can end.
function checkpoint(num) {
	var winner = isWinningNumber(num);
	if (winner === true) {
		endGame(winner);
	} else if (guessCount === 0) {
		endGame(winner);
	} else {
		feedback(num);
	}
}

// Give feedback about low/high and how far off.
function feedback(num){
	if (num < winningNumber) {
		$("h2").css("color", "black");
		$("h2").text("Too low!");
	} else {
		$("h2").css("color", "black");
		$("h2").text("Too high!");
	}
	var gradient = howFarOff(num);
	$("h1").css("color", gradient);
}

// See how far off guess is.
function howFarOff(num) {
	var difference = Math.abs(winningNumber - num);
	if ( isInRange(1, 9, difference) === true ) {
		return "red";
	} else if ( isInRange(10, 19, difference) === true ) {
		return "#FF8000";
	} else if ( isInRange(20, 29, difference) === true ) {
		return "orange";
	} else if ( isInRange(30, 39, difference) === true ) {
		return "#FACC2E";
	} else if ( isInRange(40, 49, difference) === true ) {
		return "yellow";
	} else if ( isInRange(50, 59, difference) === true ) {
		return "#82FA58";
	} else if ( isInRange(60, 69, difference) === true ) {
		return "#00FFFF";
	} else if ( isInRange(70, 79, difference) === true ) {
		return "#045FB4";
	} else if ( isInRange(80, 89, difference) === true ) {
		return "#0B0B61";
	} else {
		return "black";
	}
}

// End game.
function endGame(win) {
	disableButtons();
	$("#restart").text("Play Again");
	if (win === true) {
		$("h1").addClass("winning-animate");
		//$("h1").css("color", "red");
		$("h2").css("color", "black");
		$("h1").text("YUESS!");
		$("h2").text("You're a freaking genius!");
		$(".big-button").text("YAY! YOU WON!");
	} else {
		$(".big-button").css({"background": "#424242",
								   "color": "gray"});
		$("#hint").css({"background": "#424242",
				  			 "color": "gray"});
		$("h2").css("color", "#424242");
		$(".big-button").text("GAME OVER");
		$("h1").text(winningNumber);
		$("h2").text("WAAA WAAAAAAAA");
	}
}

// Disable buttons.
function disableButtons() {
	$(".big-button").prop("disabled", true);
	$("#hint").prop("disabled", true);
	//$(str).attr("disabled", "disabled");  // this also works
}

// Resets game.
function playAgain(){
	location.reload();
}

// Give hint.
function giveHint(){
	$("h2").css("color", "#4B088A");
	if ( triviaHints.hasOwnProperty(winningNumber) ) {
		$("h2").text(triviaHints[winningNumber]);
	} else {
		var mathHint = makeMathHint();
		$("h2").text(mathHint);
	}
}

// Trivia hints.
var triviaHints = {
	 1: "the lonelist number",
	 2: "peas in a pod",
	 3: "feet in a yard",
	 4: "Teenage Mutant Ninja Turtles",
	 5: "NYC boroughs",
	 7: "continents",
	 8: "arachnid legs",
	 9: "cat lives",
	10: "Commandments",
	11: "soccer team on the field",
	12: "noon",
	13: "card in a suit",
	19: "Adele's debut",
	21: "female KPop group",
	22: "Taylor Swift song",
	23: "Michael Jordan's prime",
	24: "Jack Bauer",
	25: "Merry Christmas",
	33: "trapped Chilean miners movie",
	34: "Basecamp's old name",
	40: "large malt liquor",
	41: "Dave Matthews Band's reply to lawsuits",
	42: "meaning of life",
	44: "Barack Obama",
	48: "Eddie Murphy and Nick Nolte",
	50: "US states",
	52: "DC limited series comic book",
	54: "NYC disco studio",
	60: "Minutes",
	64: "more than 32-bit",
	66: "Main Street of America",
	72: "shortcut rule to estimate years it will take to double money",
	74: "UNC score in 2016 NCAA Championship",
	77: "Villanova score in 2016 NCAA Championship",
	81: "American Museum of Natural History subway stop",
	83: "popular Texas Instruments graphing calculator introduced in 1996",
	86: "slang for get rid of",
	90: "application to renew or replace Green Card",
	92: "last time Summer and Winter Olympics were in the same year",
	94: "Nancy Kerrigan and Tonya Harding",
	95: "interstate that runs from Miami to Canadian border",
	97: "where hip hop lives",
	99: "problems",
   100: "Benjamin Franklin"
};

// Algebra problem generator for hints.
function makeMathHint() {
	var coefficient = getRandomIntegerInclusive(2, 9);
	var constant = getRandomIntegerInclusive(1, 100);
	var sign = getRandomIntegerInclusive(1, 10);
	var signString = "";
	if (sign >= 5) {
		sign = 1;
		signString = " + ";
	} else {
		sign = -1;
		signString = " - ";
	}
	var result = (coefficient * winningNumber) + (sign * constant);
	var mathString = coefficient + "x" + signString + constant + " = " + result;
	return mathString;
}





/* **** Event Listeners/Handlers ****  */

$(document).ready(function() {
	document.getElementById("players-guess").value = "";
	}
);

$(document).ready(function() {
		$(".big-button").click(validateGuess);
	}
);

$(document).ready(function() {
		$("#hint").click(giveHint);
	}
);

$(document).ready(function() {
		$("#restart").click(playAgain);
	}
);

$(document).ready(function() {
		$(".text-box").keyup(function(event) {
			if (event.which == 13 && $(".big-button").attr("disabled") === undefined) { 
				$(".big-button").click();
			}
		});
	}
);

$(document).ready(function() {
		$("#number-rules")
		.mouseenter(function() {
			$(this).text("number from 1 through 100");
		})
		.mouseleave(function() {
			$(this).text("number");
		})
	}
);

$(document).ready(function() {
		$("#exclamation-point")
		.mouseenter(function() {
			$(".guess-gradient").show();
		})
		.mouseleave(function() {
			$(".guess-gradient").hide();
		})
	}
);




}());