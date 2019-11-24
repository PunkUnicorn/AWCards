// cardGameUltraObject.js

function privateCreatePlayer(name, game) {

    if (typeof game === 'undefined') {        
        game = this;        
    }

    console.log('privateCreatePlayer', name, game.name);
    
    return { 
        name, 
        score:0 
    };
}


module.exports = {
    
    allDecks : [],
    allPlayers : [],
    allGames: [],

    createGame: function (name) { 

        console.log('game is created'); 
        
        return { 
            name,
            deck : [ ], 
            players: [ ], 
            createPlayer : privateCreatePlayer
        };
    }
}
