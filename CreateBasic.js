var inquirer = require('inquirer');
var fs = require('fs');

var CreateBasic = function() {
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
		var basicCard = require('./BasicCard');
	}
}

function cardCreate(count, total) {
	if(count < total) {
		inquirer.prompt([
			{
				name: "front",
				message: "What is on the front?"
			},
			{
				name: "back",
				message: "What is on the back?"
			}
		]).then(function(res) {
			fs.readFile('basic.JSON', 'utf8', function(err, data) {
				writeCard(data, res);
			});

			count++;
			cardCreate(count, total);			
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
	var cards = JSON.parse(data);
	cards.cards.push({
		front: res.front,
		back: res.back,
	});
	data = JSON.stringify(cards);

	fs.writeFile('basic.JSON', data, function(err){
		if(err) {
			console.log(err);
		}
	});	
}

module.exports = CreateBasic;