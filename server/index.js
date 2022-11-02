require('dotenv').config()
const bodyParser = require("body-parser")
const  mongoose  = require('mongoose')
const routes = require('./routes/api')

const express = require('express')
const app = express()
const port = 3001
const http = require("http")
const { Server } = require("socket.io")
const cors = require('cors')


mongoose.Promise = global.Promise
mongoose.connect( process.env.DB, {useNewUrlParser: true})
.then(() => console.log('connected to DB'))
.catch((err) => console.log(err))

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use('/api', routes)

const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods:["GET", "POST", "PUT"]
    },
})

io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on("creat_room", (data) => {
        console.log("data");
        socket.join(data)
        console.log(`User ${socket.id} room: ${data} created`);
        // socket.broadcast.emit("follow_the_room", data + 1)
    })
    

    // socket.on("set_player", (data) => {
    //     socket.to(data.room).emit("sending_session", data)
    // })

    socket.on("make_the_move", (data) => {
        socket.broadcast.emit("cach_the_move", data)
    })

    

    socket.on('disconnect', () => {
        console.log('USER DISCONNECTED');
    })
})

server.listen(port, () => {
    console.log(`server connected on ${port}`);
})