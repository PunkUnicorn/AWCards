var fs = require('fs');
var path = require('path');
var cardGameUltraObject = require("./cardGameUltraObject.js");
var deckLoading = require("./deckLoading.js");
var express=require('express');


var app = express();

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

console.log('Listing decks...')
var decks = deckLoading.getDecks();
console.log(decks[0], decks[1]);

//////var cards = deckLoading.getCards(decks[0][0], decks[1][0], decks[0][1], decks[1][1]);
//////console.log(cards);

console.log(fs.readFileSync('./leader.txt', 'ascii'));

console.log('Server ready... ');
console.log('\n\n\n\t\tGo fuck yourself!')
var server=app.listen(3000,function() {});
