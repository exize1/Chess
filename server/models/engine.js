const mongoose = require('mongoose')

const EngineSchema = mongoose.Schema({

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

const Engine = mongoose.model('engine', EngineSchema)
module.exports = Engine 