var hashmap = require('./hashmap-2.0.4/hashmap');
var fs = require('fs');
var path = require('path');
var util = require('util');


var allCards = [ {deck: [], deckInfo: new hashmap.HashMap(/*deckTitle, deckInfo*/)},
                 {deck: [], deckInfo: new hashmap.HashMap(/*deckTitle, deckInfo*/)} ];
const WHITE = 0;
const BLACK = 1;

function makeUnderscoresTheSame (question) {
	
	const TheOneWeWant =  '______';	
	
	// WIP
	const punctuation = [' ','"','“','”','!','?',':',';','#','.',',','-'];
	const expressionForPunctuation = [' ','"','“','”','\!','\?','\:',';','#','\.',',','-'];
	//var regexp = new RegExp("/[A-Z|a-z]_{7,14}\./g");
	//delete regexp;
	// WIP


	// accomodate the regular expression a little
	//question = question;
	if (question.substr(question.length-1, 1) == '_')
		question += ' ';

	if (question.substr(0, 1) == '_')
		question = ' ' + question

	question = question.replace('“', '"');
	question = question.replace('”', '"');

	question = question.replace(/ _{7,14}\./g, ' '+TheOneWeWant+'.');
	question = question.replace(/ _{7,14}\?/g, ' '+TheOneWeWant+'?');
	question = question.replace(/ _{7,14}\!/g, ' '+TheOneWeWant+ '!');
	question = question.replace(/ _{7,14};/g, ' '+TheOneWeWant+';');
	question = question.replace(/ _{7,14}\:/g, ' '+TheOneWeWant+':');
	question = question.replace(/ _{7,14} /g, ' '+TheOneWeWant+' ');
	question = question.replace(/ _{7,14},/g, ' '+TheOneWeWant+',');
	question = question.replace(/ _{7,14}"/g, ' '+TheOneWeWant+'"');
	question = question.replace(/ _{7,14}-/g, ' '+TheOneWeWant+'-');

	question = question.replace(/"_{7,14}\./g, '"'+TheOneWeWant+'.');
	question = question.replace(/"_{7,14}\?/g, '"'+TheOneWeWant+'?');
	question = question.replace(/"_{7,14}\!/g, '"'+TheOneWeWant+ '!');
	question = question.replace(/"_{7,14};/g, '"'+TheOneWeWant+';');
	question = question.replace(/"_{7,14}\:/g, '"'+TheOneWeWant+':');
	question = question.replace(/"_{7,14} /g, '"'+TheOneWeWant+' ');
	question = question.replace(/"_{7,14},/g, '"'+TheOneWeWant+',');
	question = question.replace(/"_{7,14}"/g, '"'+TheOneWeWant+'"');
	question = question.replace(/"_{7,14}-/g, '"'+TheOneWeWant+'-');

	question = question.replace(/ _{1,5}\./g, ' '+TheOneWeWant+'.');
	question = question.replace(/ _{1,5}\?/g, ' '+TheOneWeWant+'?');
	question = question.replace(/ _{1,5}\!/g, ' '+TheOneWeWant+ '!');
	question = question.replace(/ _{1,5};/g, ' '+TheOneWeWant+';');
	question = question.replace(/ _{1,5}\:/g, ' '+TheOneWeWant+':');
	question = question.replace(/ _{1,5} /g, ' '+TheOneWeWant+' ');
	question = question.replace(/ _{1,5},/g, ' '+TheOneWeWant+',');
	question = question.replace(/ _{1,5}"/g, ' '+TheOneWeWant+'"');
	question = question.replace(/ _{1,5}-/g, ' '+TheOneWeWant+'-');

	question = question.replace(/"_{1,5}\./g, '"'+TheOneWeWant+'.');
	question = question.replace(/"_{1,5}\?/g, '"'+TheOneWeWant+'?');
	question = question.replace(/"_{1,5}\!/g, '"'+TheOneWeWant+ '!');
	question = question.replace(/"_{1,5};/g, '"'+TheOneWeWant+';');
	question = question.replace(/"_{1,5}\:/g, '"'+TheOneWeWant+':');
	question = question.replace(/"_{1,5} /g, '"'+TheOneWeWant+' ');
	question = question.replace(/"_{1,5},/g, '"'+TheOneWeWant+',');
	question = question.replace(/"_{1,5}"/g, '"'+TheOneWeWant+'"');
	question = question.replace(/"_{1,5}-/g, '"'+TheOneWeWant+'-');

	return question.trim();
};

function loadDeckSimple (getIndexVar, file, colour /*'black' 'white' or 'mixed' for unknown*/, startDeckTitle, doAcceptCard, doHasDeckInfo, doSetDeckInfo) {
	var doUnderscoreTest = false;

	var buffer = fs.readFileSync(file, 'utf8');

	const startTrigger = 'Cards Against Humanity:';
	console.log('bytes read:', buffer.length);
	var bigString = buffer.toString();
	arrayOfLines = bigString.match(/[^\r\n]+/g); //http://stackoverflow.com/questions/5034781/js-regex-to-split-by-line

	var makeDeckInfo = function() {
		return { startIndex:0, endIndex:0 };
	};

	var makeDeckTitle = function (deckTitle, colour) {
		var key = deckTitle.trim() + ' (' + colour + ')';
		var count = 0;
		while (doHasDeckInfo(colour, key)) {
			key += ' and another';
			count++;
		}
		return key;
	};

	var deckTitle = makeDeckTitle(startDeckTitle, colour);
	var deckInfo = makeDeckInfo();
	//var cardNo = startCardNo;
	var setStartIndex = true;
	var setEndIndex = false;
	var lastDecentLineNo = 0;
	var isBlackCard = false;
	for (var lineIndex in arrayOfLines) {
		var line = arrayOfLines[lineIndex].trim();
		if (line.length == 0) continue;

		if (line.substr(0, startTrigger.length) === startTrigger) {
			if (setEndIndex) {
				deckInfo.endIndex = lastDecentLineNo;
				console.log('Deck: ' + deckTitle);

				doSetDeckInfo(colour, deckTitle, deckInfo);
				deckInfo = makeDeckInfo();
			}

			var possibleDeckTitle = line
				.substr(startTrigger.length)
				.trim();

			if (possibleDeckTitle.length > 0) {
				deckTitle = makeDeckTitle(possibleDeckTitle, colour);
			} else {
				//continue;
				deckTitle = startDeckTitle;
			}

			setStartIndex = true;
			setEndIndex = true;
		}
		else {
			// underscores test
			isBlackCard = (colour == 'black') || (colour == 'mixed' &&  (line.indexOf('_') > -1 || line.indexOf('?') == line.length-1));
			if (isBlackCard) {
				var testLine = makeUnderscoresTheSame(line);
				//If any underscores after this we failed at making them standard
				var failed = testLine
						.replace(/______/g, 'XXXXXX')
						.indexOf('_') > -1 ? true : false;

				if (failed) {
					console.log('ERROR ERIC:'+testLine);
				}

				line = testLine;
			}

			if (doAcceptCard(isBlackCard, line)) {
				if (setStartIndex) {
					deckInfo.startIndex = getIndexVar(isBlackCard, false);
					setStartIndex = false;
					setEndIndex = true;
				}

			//cards.deck.push(line);

				lastDecentLineNo = getIndexVar(isBlackCard, false);
				getIndexVar(isBlackCard, true);
			}
		}
	}

	if (setEndIndex) {
		deckInfo.endIndex = lastDecentLineNo;
		setEndIndex = false;
		doSetDeckInfo(colour, deckTitle, JSON.parse(JSON.stringify(deckInfo)));
	}

	//deckInfo.startIndex = cardNo;
	//allCards.deckInfo.set(possibleDeckTitle, deckInfo);

	bigString = '';
	arrayOfLines = 0;

	//return cardNo;
};

// deckLoading.js
module.exports  = {
	
	TEST: function () {
		
		var tryIt = function(testQuestion, expectedAnswer) {
			console.log('');
			//console.log(testQuestion);
			var result = makeUnderscoresTheSame(testQuestion);
			console.log(testQuestion + '<-INPUT')
			console.log(result+'<-RESULT');
			console.log(expectedAnswer+'<-EXPECTED');
			console.log('');
			console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
			console.log('');
			if (expectedAnswer == result) {
				return true;
			}
			return false;
		}
		const test1a = 'ah _ hello __  ___ ! _____ ? _______ yes ________ no _________';
		const expected1a = 'ah ______ hello ______  ______ ! ______ ? ______ yes ______ no ______';

		const test1b = 'maybe __________ word ___________ up ____________ cmon _____________ yee _____________';
		const expected1b = 'maybe ______ word ______ up ______ cmon ______ yee ______';

		if (!tryIt(test1a, expected1a)) console.log('first a failed xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
		if (!tryIt(test1b, expected1b)) console.log('first b failed xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

		const test2a = '"_ _- the "__" quick "___!" brown"_____: Dance moves that are just sex"_______;';
		const test2b = 'jumped "________. over "_________, the "__________? lazy "___________ MORTAL COMBAT!!!.';

		const expected2a = '"______ ______- the "______" quick "______!" brown"______: Dance moves that are just sex"______;';
		const expected2b = 'jumped "______. over "______, the "______? lazy "______ MORTAL COMBAT!!!.';

		if (!tryIt(test2a, expected2a)) console.log('second a failed xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
		if (!tryIt(test2b, expected2b)) console.log('second b failed xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
	},

	//    _                 _______          _
	//   | |               | |  _  \        | |
	//   | | ___   __ _  __| | | | |___  ___| | __
	//   | |/ _ \ / _` |/ _` | | | / _ \/ __| |/ /
	//   | | (_) | (_| | (_| | |/ /  __/ (__|   <
	//   |_|\___/ \__,_|\__,_|___/ \___|\___|_|\_\

	loadAllDecks: function() {
		var addCard = function(isBlackCard, card) {
			if (isBlackCard)
				allCards[BLACK].deck.push(card);
			else
				allCards[WHITE].deck.push(card);

			return true;
		}
		var hasDeckInfo = function(colour, deckTitle) {
			switch (colour) {
				case 'black': return allCards[BLACK].deckInfo.has(deckTitle);
				case 'white': return allCards[WHITE].deckInfo.has(deckTitle);

				case 'mixed':
				default:
					return ( allCards[BLACK].deckInfo.has(deckTitle)
							 || allCards[WHITE].deckInfo.has(deckTitle) );
			}
		}
		var setDeckInfo = function(colour, deckTitle, deckInfo) {
			switch (colour) {
				case 'black':
					allCards[BLACK].deckInfo.set(deckTitle, deckInfo);
					break;

				case 'white':
					allCards[WHITE].deckInfo.set(deckTitle, deckInfo);
					break;

				case 'mixed':
				default:
					if (!allCards[BLACK].deckInfo.has(deckTitle))
						allCards[BLACK].deckInfo.set(deckTitle, deckInfo);

					if (!allCards[WHITE].deckInfo.has(deckTitle))
						allCards[WHITE].deckInfo.set(deckTitle, deckInfo);

					break;
			}
			return true;
		}

		var startWhiteCardNo = 0;
		var startBlackCardNo = 0;

		var getIndexVar = function(isBlackCard, incrementItToo) {
			if (isBlackCard)
				return (incrementItToo) ? startBlackCardNo++ : startBlackCardNo;
			else
				return (incrementItToo) ? startWhiteCardNo++ : startWhiteCardNo;
		};
		//loadDeckSimple(getIndexVar,'./cards/testQuestions.txt', 'black', 'Main Deck', addCard, hasDeckInfo, setDeckInfo);
		//loadDeckSimple(getIndexVar, './cards/testAnswers.txt', 'white', 'Main Deck', addCard, hasDeckInfo, setDeckInfo);


		//loadDeckSimple(getIndexVar,'./cards/CaHMainBlack.txt', 'black', 'Main Deck', addCard, hasDeckInfo, setDeckInfo);
		//loadDeckSimple(getIndexVar, './cards/CaHMainWhite.txt', 'white', 'Main Deck', addCard, hasDeckInfo, setDeckInfo);
		//loadDeckSimple(getIndexVar,'./cards/CaHUkMainBlack.txt', 'black', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		//loadDeckSimple(getIndexVar,'./cards/CaHUkMainWhite.txt', 'white', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);




		loadDeckSimple(getIndexVar,'./cards/CaHExpansionsBlack.txt', 'black', 'Expansions', addCard, hasDeckInfo, setDeckInfo);
		loadDeckSimple(getIndexVar,'./cards/CaHExpansionsWhite.txt', 'white', 'Expansions', addCard, hasDeckInfo, setDeckInfo);

		loadDeckSimple(getIndexVar,'./cards/CaHCrabsAdjustHumidityBlack.txt', 'black', 'Crabs Adjust Humidity', addCard, hasDeckInfo, setDeckInfo);
		loadDeckSimple(getIndexVar,'./cards/CaHCrabsAdjustHumidityWhite.txt', 'white','Crabs Adjust Humidity', addCard, hasDeckInfo, setDeckInfo);

	/*	
		loadDeckSimple(getIndexVar,'./cards/CaHHolidaySpecialsMixed.txt', 'mixed', 'Holiday Special', addCard, hasDeckInfo, setDeckInfo);
		
*/		

		loadDeckSimple(getIndexVar,'./cards/CaHUkMainBlack.txt', 'black', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		loadDeckSimple(getIndexVar,'./cards/CaHUkMainWhite.txt', 'white', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);


		loadDeckSimple(getIndexVar,'./cards/CaHExpansion90sBlack.txt', 'black', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		loadDeckSimple(getIndexVar,'./cards/CaHExpansion90sWhite.txt', 'white', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);

		loadDeckSimple(getIndexVar,'./cards/CaHDevOpsAgainstHumanityBlack.txt', 'black', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		loadDeckSimple(getIndexVar,'./cards/CaHDevOpsAgainstHumanityWhite.txt', 'white', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);			



		// loadDeckSimple(getIndexVar,'./cards/', 'black', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		// loadDeckSimple(getIndexVar,'./cards/', 'white', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		
		// loadDeckSimple(getIndexVar,'./cards/', 'black', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		// loadDeckSimple(getIndexVar,'./cards/', 'white', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		
		// loadDeckSimple(getIndexVar,'./cards/', 'black', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		// loadDeckSimple(getIndexVar,'./cards/', 'white', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		
		// loadDeckSimple(getIndexVar,'./cards/', 'black', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		// loadDeckSimple(getIndexVar,'./cards/', 'white', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		
		// loadDeckSimple(getIndexVar,'./cards/', 'black', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		// loadDeckSimple(getIndexVar,'./cards/', 'white', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		
		// loadDeckSimple(getIndexVar,'./cards/', 'black', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);
		// loadDeckSimple(getIndexVar,'./cards/', 'white', 'UK/AU Main Deck', addCard, hasDeckInfo, setDeckInfo);	
		
		
		// fix deckinfo
		var prev_start = allCards[WHITE].length - 1;
		for (var i = allCards[WHITE].deckInfo.length; --i >= 0; ) {
			allCards[WHITE].deckInfo[i].endIndex = prev_start;
			prev_start = allCards[WHITE].deckInfo[i].startIndex - 1;
		}
		
		prev_start = allCards[BLACK].length - 1;
		for (var i = allCards[BLACK].deckInfo.length; --i >= 0; ) {
			allCards[BLACK].deckInfo[i].endIndex = prev_start;
			prev_start = allCards[BLACK].deckInfo[i].startIndex - 1;
		}
	},	

	dumpAllCards: function() {			
		function mydump(arr,level) { //https://stackoverflow.com/questions/749266/object-dump-javascript
			var dumped_text = "";
			if(!level) level = 0;

			var level_padding = "";
			var uselvl = level+1 % 8;
			for(var j=0;j<uselvl;j++) level_padding += " ";

			if(typeof(arr) == 'object') {  
				for(var item in arr) {
					var value = arr[item];

					if(typeof(value) == 'object') { 
						dumped_text += level_padding + "'" + item + "' ...\n";
						dumped_text += mydump(value,level+1);
					} else {
						dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
					}
				}
			} else { 
				dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
			}
			return dumped_text;
		}		
		
		
		function dumpCards(deck) {
			console.log(deck);
						
			
			/* deck.deckInfo.forEach(function(value, key) {
				console.log('***', key, '***');
				console.log(value, '@@@@@@@@@@@@@@@@@@@@@@@@@');
				console.log(util.inspect(value), deck.deck.length);
					
				for (var i = value.startIndex; i <= value.endIndex; i++) {
					console.log(i, deck.deck[i]);
				}
			} ); */
						
		}
		allCards.forEach(element => dumpCards(element) );
	}
};
