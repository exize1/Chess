const express = require('express')
const { engine } = require('../engine/engine')
const Engine = require('../models/engine')
const router = express.Router()
const Game = require('../models/game')


router.get('/position/:room', (req, res, next) => {
  Game.findOne({room: req.params.room})
    .then((data) => res.json(data))
    .catch(next)
})

router.post('/position/', ( req, res, next) => {
  Game.find({})
  .then(data => {
    const latesGame = data[data.length - 1]
    if (latesGame.players % 2 === 0){
        Game.create({
            board: "RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr", 
            white: true,
            players: 1,
            room: latesGame.room + 1
          })
        .then((data) => {res.json(data)})
        .catch(next)
    }else {
        Game.create({
          board: "RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr", 
          white: false,
          players: 2,
          room: latesGame.room 
        })
    .then((data) => {res.json(data)})
    .catch(next)
    }
  })
})

router.put('/position/', (req, res, next) => {
  Game.findOneAndUpdate({ room: req.body.room}, req.body)
    .then((data) => res.json(data))
    .catch(err => res.json(err))
})

router.get('/engine/', (req, res, next) => {
  Engine.find({})
    .then((data) => res.json(data))
    .catch(next)
})

router.get('/engine/:id', (req, res, next) => {
  Engine.find({_id: req.params.id})
    .then((data) => res.json(data))
    .catch(next)
})

router.post('/engine/', ( req, res, next) => {
  Engine.create({
      board: "RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr", 
      white: true,
    })
    .then((data) => {res.json(data)})
    .catch(next)
})

router.put('/engine/', async(req, res, next) => {
  const board = await engine(req.body.board, req.body.white)
  const update = {
    board
  }
  await Engine.findOneAndUpdate({ _id: req.body.id}, update)
    .then((data) => res.json(data))
    .catch(err => res.json(err))
})




module.exports = router