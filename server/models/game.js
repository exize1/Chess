const mongoose = require('mongoose')

const GameSchema = mongoose.Schema({
    board: {
        type : String,
        required : true,
        default: "RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr"
    },
    white:{
        type: Boolean,
        required: true,
        default: true
    },
    isBlackKingMoved: {
        type: Boolean,
        default: false
    },
    isWhiteKingMoved: {
        type: Boolean,
        default: false
    }
})

const Game = mongoose.model('game', GameSchema)
module.exports = Game