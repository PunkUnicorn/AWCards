var fs = require('fs');
var path = require('path');
var cardGameUltraObject = require("./cardGameUltraObject.js");
var deckLoading = require("./deckLoading.js");
var express=require('express');


var app = express();

function sendHtmlFile(filename, res) {
	
	res.set('Content-Type', 'text/html');

	return res;
}

app.get('/', function(req, res) {
	
	res.sendfile('./index.html')
		
	var wut = cardGameUltraObject.createGame('bobs game');
	var player = wut.createPlayer('bob');
	
});


console.log('Testing underscore swap...')
deckLoading.TEST();

console.log('Loading all decks...')
deckLoading.loadAllDecks();
deckLoading.dumpAllCards();

console.log(fs.readFileSync('./leader.txt', 'ascii'));

console.log('Server ready! Go fuck yourself!')
var server=app.listen(3000,function() {});
