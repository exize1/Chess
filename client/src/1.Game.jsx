import './App.css';
import Board from './board/Board';
import Movment from './board/Movment';
import { useEffect, useState } from "react"
import './1.game.css'
import { getGame } from './utils/req';
import { publicRequest } from './requestMethods';

function Game( { room,  engineId, engineGame } ) {
  const [board, setBoard] = useState("RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr")
  const white = window.sessionStorage.getItem("white")


  // useEffect(() => {
    // publicRequest.put('/position', {
    //     "_id" : "635a7e13b45f7777529539c4",
    //     "board": "RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr",
    //     "white": "true"
    // }).then((res) => {
    //     getGame(setId, setBoard)
    // })
    // .catch((err) => console.log(err));
  // },[])
  return (
    <div className='screen'>
      <div className='transparency'>
        <div className="game-container">
          <div className='elemnt-3D'>
            <div className={`board-component-container ${white === "false" && "rotate-board"}`}>
              <Board/>
              <Movment board={board} setBoard={setBoard} room={room} engineId={engineId} engineGame={engineGame}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game;