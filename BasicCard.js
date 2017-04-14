var fs = require('fs');
var inquirer = require('inquirer');

function basic () {
	fs.readFile('basic.JSON', 'utf8', function(err, data) {
		if(err) {
			console.log(err);
		}
		var dataArr = JSON.parse(data);
		quiz(dataArr.cards, 0, 0);
	});
}

function quiz(cards, count, correct) {
	if(count < cards.length) {
		var front = cards[count].front;
		var back = cards[count].back.toLowerCase();
		inquirer.prompt([
			{
				name: "question",
				message: front
			}	
		]).then(function(res) {
			var response = res.question.toLowerCase();
			if(response === back) {
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

module.exports = basic();