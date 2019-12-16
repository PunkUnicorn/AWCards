var fs = require('fs');
var path = require('path');
var cardGameUltraObject = require("./cardGameUltraObject.js");
var deckLoading = require("./deckLoading.js");
var express=require('express');


// create a config store ("playershitandstuff.json") in the current working directory
const store = require('data-store')({ path: process.cwd() + '/playershitandstuff.json' });


/* see https://www.npmjs.com/package/data-store#usage-example */



var app = express();

app.use(express.static('public'));

var buildTimestamp = process.env.created_at || 'unknown';

app.get('/buildtimestamp', function (req, res) {
	res.write(buildTimestamp);
	res.end();
});

app.get('/games', function(req, res) {
	var allGames = cardGameUltraObject.getGames();
	console.log('allGames', allGames);
	
	res.setHeader('Content-Type', 'application/json');
	
	console.log(allGames);
	res.end(JSON.stringify(allGames));
});

app.post('/creategame', function(req, res) {
	console.log(' \creategame', req);

	var gamename = req.param('gamename');
	
	var wut = cardGameUltraObject.createGame(gamename);

	res.write(wut);
	res.end();
});

app.post('/createplayer', function(req, res) {
	console.log(' \createplayer', req);
	
	var playerName = req.param('playername');
	var createResultPlayer = cardGameUltraObject.createPlayer(name);
	var createResultGame = { ok:true };	

	if (createResultPlayer.ok) {
		var autoAddGameName = req.param('gamename');
		if (typeof autoAddGameName !== 'unknown') {
			createResultGame = cardGameUltraObject.addPlayer(autoAddGameName, playerName);
		}
	}
	
	res.end( {
		ok :createResultPlayer.ok && createResultGame.ok, 
		player: createResultPlayer, 
		game: createResultGame 
	});
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

