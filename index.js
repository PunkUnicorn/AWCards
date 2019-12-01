var fs = require('fs');
var path = require('path');
var cardGameUltraObject = require("./cardGameUltraObject.js");
var deckLoading = require("./deckLoading.js");
var express=require('express');

//console.log(process.env);

var buildTimestamp = process.env.created_at || 'unknown';

var app = express();

app.use(express.static('public'));

app.get('/buildtimestamp', function (req, res) {
	res.write(buildTimestamp);
	res.end();
});

app.post('/creategame', function(req, res) {
	console.log(' \creategame', req);

	var gameName = req.param('name');
	
	var wut = cardGameUltraObject.createGame(gameName);
	
	//var player = wut.createPlayer('bob');	
});

app.post('/createplayer', function(req, res) {
	console.log(' \createplayer', req);
	
	var playerName = req.param('name');
	var createResult = cardGameUltraObject.createPlayer(name);
	
	if (createResult.ok) {
		var autoAddGameName = req.param('game');
		if (typeof autoAddGameName !== 'unknown') {
			createResult = cardGameUltraObject.addPlayer(autoAddGameName, name);
		}
	}
	
	res.write(createResult);
	res.end();
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

console.log('buildTimestamp', buildTimestamp);

const port = process.env.PORT || 8080;
var server=app.listen(port,function() {});
console.log('listening on port '+port+'........ Server ready!');
console.log('\n\n\thttp://localhost:'+port+'/');
 
app.get('/killserverbobaba', function(req, res) {
	server.close();
});

