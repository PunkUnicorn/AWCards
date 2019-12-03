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

var mockGameArray =[{ 
            gamename:'bobs game', 
            players: [{ 
                playername:'Trump', 
                score:10, 
                cards:[] 
            }, { 
                playername:'Johnson', 
                score:7, 
                cards:[]
            } ]
        },
        { 
            gamename:'johns game', 
            players: [{ 
                playername:'Wilson', 
                score:10, 
                cards:[] 
            }, { 
                playername:'JFK', 
                score:7, 
                cards:[]
            } ]
        },
        { 
            gamename:'judys game', 
            players: [{ 
                playername:'Alice', 
                score:10, 
                cards:[] 
            }, { 
                playername:'Jilly', 
                score:7, 
                cards:[]
            } ]
        },
        { 
            gamename:'alfs game', 
            players: [{ 
                playername:'jonny', 
                score:10, 
                cards:[] 
            }, { 
                playername:'harry', 
                score:7, 
                cards:[]
            } ]
        },
        { 
            gamename:'tonys game', 
            players: [{ 
                playername:'Blair', 
                score:10, 
                cards:[] 
            }, { 
                playername:'Thatcher', 
                score:7, 
                cards:[]
            } ]
        }];  

module.exports = {
    
    allDecks : [],
    allPlayers : [],
    allGames: [],

    getGames : function() {
        return mockGameArray;

    },

    createPlayer: function(name) {
        console.log('player is created'); 
        return {
            ok : true,
            name            
        };
    },
    
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
