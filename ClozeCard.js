var fs = require('fs');
var inquirer = require('inquirer');

function cloze () {
	fs.readFile('cloze.JSON', 'utf8', function(err, data) {
		if(err) {
			console.log(err);
		}
		var dataArr = JSON.parse(data);
		quiz(dataArr.cards, 0, 0);
	});
}

function quiz(cards, count, correct) {
	if(count < cards.length) {
		var partial = cards[count].partial;
		var cardCloze = cards[count].cloze.toLowerCase();
		inquirer.prompt([
			{
				name: "question",
				message: partial
			}	
		]).then(function(res) {
			var response = res.question.toLowerCase();
			if(response === cardCloze) {
				console.log("correct!");
				correct++;
			} else {
				console.log("You're just wrong");
			}
			count++;
			quiz(cards, count, correct);
		});			
	} else {
		console.log("You answered " + correct + " correctly!");
		inquirer.prompt([
			{
				type: "confirm",
				name: "response",
				message: "Play again?"
			}
		]).then(function(res) {
			if(res.response) {
				quiz(cards, 0, 0);
			} else {
				return;
			}
		});
	}
}

module.exports = cloze();