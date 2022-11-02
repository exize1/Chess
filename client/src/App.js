import Game from './1.Game';
import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
import Home from './2.Home';

export const socket = io.connect("http://localhost:3001")

function App() {

  const [newGame, setNewGame] = useState(false)
  const [engineGame, setEengineGame] = useState(false)
  const [engineId, setEengineId] = useState("")
  const [room, setRoom] = useState(0)

  // useEffect(() => {
  //   socket.on("recieve_message", data => {
  //     setMessageRecieved(data.message)
  //   })
  // }, [socket])

  return (
    <div  className="App">
      {newGame ?
        <Game room={room} engineId={engineId} engineGame={engineGame}/>
        :
        <Home setNewGame={setNewGame}  setRoom={setRoom} setEengineId={setEengineId} setEengineGame={setEengineGame}/>
      } 
    </div>
  )
}

export default App;
