var hashmap = require('./hashmap-2.0.4/hashmap');

var fs = require('fs');
var path = require('path');
var url = require('url');
var util = require('util');

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


fs.readFile('./leader.txt', 'ascii', function (err, data){
	console.log(data);
	if (err != null) console.log(err);
});

deckLoading.TEST();

var server=app.listen(3000,function() {});
