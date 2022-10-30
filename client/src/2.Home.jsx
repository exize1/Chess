import './App.css';
import Board from './board/Board';
import Movment from './board/Movment';
import { useEffect, useState } from "react"
import './1.game.css'
import { getGame } from './utils/req';
import { publicRequest } from './requestMethods';
import { socket } from './App';
import './home.css'

function Home({ setNewGame }) {
  const [board, setBoard] = useState("RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr")
  const [id, setId] = useState("")
  

  const createNewGameRoom = () => {
    let room = 1
    socket.emit("join_room", room)
    setNewGame(true)
  }
  return (
    <div className='screen'>
        <div className='transparency'>
            <div className='home'>
                <button className='new-game' onClick={createNewGameRoom}>New Game</button>
            </div>
        </div>
    </div>
  );
}

export default Home;