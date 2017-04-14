var inquirer = require('inquirer');
var fs = require('fs');

var CreateCloze = function() {
	this.create = function() {
		inquirer.prompt([
			{
				name: "cards",
				message: "How many cards would you like to create?",
				validate: function(value) {
				if (isNaN(value) === false && parseInt(value) > 0) {
					return true;
				}
					return false;
				}
			}
		]).then(function(res) {
			cardCreate(0, res.cards);
		});
	}

	this.begin = function() {
		var clozeCard = require('./ClozeCard.js');
	}
}

function cardCreate(count, total) {
	if(count < total) {
		inquirer.prompt([
			{
				name: "fullText",
				message: "What is the full text?"
			},
			{
				name: "cloze",
				message: "What is the cloze?"
			}
		]).then(function(res) {
			if(res.fullText.indexOf(res.cloze) > -1){
				fs.readFile('cloze.JSON', 'utf8', function(err, data) {
					writeCard(data, res);
				});

				count++;
				cardCreate(count, total);
			} else {
				console.log("Cloze does not exist in the text");
				console.log(res.fullText);
				console.log(res.cloze);
			}
			
		});
	} else {
		if(total > 1) {
			console.log("Cards added!");
		} else {
			console.log("Card added!");
		}
	}
}

function writeCard(data, res) {
	var partial = res.fullText.replace(res.cloze, "...");
	var cards = JSON.parse(data);
	cards.cards.push({
		fullText: res.fullText,
		cloze: res.cloze,
		partial: partial
	});
	data = JSON.stringify(cards);

	fs.writeFile('cloze.JSON', data, function(err){
		if(err) {
			console.log(err);
		}
	});	
}

module.exports = CreateCloze;