const express = require('express')
const router = express.Router()
const Game = require('../models/game')


router.get('/position/', (req, res, next) => {
  Game.find({})
    .then((data) => res.json(data))
    .catch(next)
})

router.post('/position/', ( req, res, next) => {
  Game.create({
    board: "RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr",
    white: true
  })
    .then((data) => res.json(data))
    .catch(next)
})

router.put('/position/', (req, res, next) => {

  Game.findOneAndUpdate({ _id: req.body._id}, req.body)
    .then((data) => res.json(data))
    .catch(err => res.json(err))
})


module.exports = router