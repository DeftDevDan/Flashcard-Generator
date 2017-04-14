var inquirer = require('inquirer');
var CreateBasic = require('./CreateBasic');
var CreateCloze = require('./CreateCloze');

start();

function start() {
	inquirer.prompt([
		{
			name: "path",
			message: "Create a card or begin quiz? (Respond with create/begin)"	
		}, {
			name: "type",
			message: "Basic or Cloze?"
		}
	]).then(function(response) {
		if(response.path.toLowerCase() === "create") {
			checkType(response.type.toLowerCase(), "create");
		} else if(response.path.toLowerCase() === "begin") {
			checkType(response.type.toLowerCase(), "begin");
		} else {
			console.log("Please respond with \"create\" or \"begin.\"");
			start();
		}		
	});	
}

function checkType(type, path) {
	if(type === "basic") {
		var basic = new CreateBasic();
		if(path === "create") {
			basic.create();
		} else {
			basic.begin();
		}
	} else if(type === "cloze") {
		var cloze = new CreateCloze();
		if(path === "create") {
			cloze.create();
		} else {
			cloze.begin();
		}
	} else {
		console.log("Please respond with \"basic\" or \"cloze.\"")
		start();
	}
}
