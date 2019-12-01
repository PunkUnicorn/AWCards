// cardGameUltraObject.js

function privateAddPlayer(name, game) {

    if (typeof game === 'undefined') {        
        game = this;        
    }

    console.log('privateAddPlayer', name, game.name);
    
    return { 
        ok : true,
        name, 
        score:0 
    };
}


module.exports = {
    
    allDecks : [],
    allPlayers : [],
    allGames: [],

    createPlayer: function(name) {
        console.log('player is created'); 
        return {
            ok : true,
            name            
        };
    }.
    createGame: function (name) { 

        console.log('game is created'); 
        
        return { 
            ok: true,
            name,
            deck : [ ], 
            players: [ ], 
            addPlayer : privateAddPlayer
        };
    }
}
