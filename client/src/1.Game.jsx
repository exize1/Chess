import './App.css';
import Board from './board/Board';
import Movment from './board/Movment';
import { useState } from "react"
import NewBoard from './board/NewBoard';

function Game() {
    const [board, setBoard] = useState("RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr")


  return (
    <div className="App">
      <div className='board-component-container'>
        <Board/>
        <Movment board={board} setBoard={setBoard}/>
        {/* <NewBoard/> */}
      </div>
    </div>
  );
}

export default Game;