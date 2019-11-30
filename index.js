var fs = require('fs');
var path = require('path');
var cardGameUltraObject = require("./cardGameUltraObject.js");
var deckLoading = require("./deckLoading.js");
var express=require('express');


var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
	
	//res.sendfile('./public/index.html')
		
	var wut = cardGameUltraObject.createGame('bobs game');
	var player = wut.createPlayer('bob');
	console.log(' \ ', req);
});


console.log(fs.readFileSync('./leader.txt', 'ascii'));

console.log('Testing underscore swap...')
deckLoading.TEST();

console.log('Loading all decks...')
deckLoading.loadAllDecks();
deckLoading.dumpAllCards();

console.log('Listing decks...')
var decks = deckLoading.getDecks();
console.log(decks[0], decks[1]);

var cards = deckLoading.getCards(decks[0].concat(decks[1]));
console.log('Listing cards...')
console.log(cards);

console.log(fs.readFileSync('./gfy.txt', 'ascii'));

var server=app.listen(3000,function() {});
console.log('listening on port 3000........ Server ready!');
