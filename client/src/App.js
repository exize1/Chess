import Game from './1.Game';
import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
import Home from './2.Home';

export const socket = io.connect("http://localhost:3001")

function App() {

  const [room, setRoom] = useState("")
  const [message, setMessage] = useState("")
  const [messageRecieved, setMessageRecieved] = useState("")
  const [newGame, setNewGame] = useState(false)

  // useEffect(() => {
  //   socket.on("recieve_message", data => {
  //     setMessageRecieved(data.message)
  //   })
  // }, [socket])

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room)
    }
  }

  const sendMessage = () => {
    socket.emit('send_message', { message, room })
    // setUserName(true)
  }
  return (
    <div  className="App">
      <div>
        {/* <input type="text" placeholder="Room" onChange={(e) => {setRoom(e.target.value)}}></input> */}
        {/* <button onClick={joinRoom}>join</button>
        <input type="text" placeholder="message" onChange={(e) => {setMessage(e.target.value)}}></input> */}
        {/* <button onClick={joinRoom}>Enter Game</button> */}
        {/* <p>{messageRecieved}</p> */}
      </div>
      {/* <div> */}
      {newGame ?
        <Game/>
        :
        <Home setNewGame={setNewGame}/>
      }
      {/* </div> */}
    </div>
  )
}

export default App;
