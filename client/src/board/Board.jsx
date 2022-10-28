import "./board.scss"
import {
    FaChessPawn,
    FaChessKing,
    FaChessQueen,
    FaChessKnight,
    FaChessBishop,
    FaChessRook
} from "react-icons/fa"

const Board = () => {

    const columns = ["h", "g", "f", "e", "d", "c", "b" ,"a"]
    const rows = [
        [1, "one"], 
        [2, "two"], 
        [3, "three"], 
        [4, "four"], 
        [5, "five"], 
        [6, "six"], 
        [7, "seven"], 
        [8, "eight"]]
        
    // const a = {
    //         y1: [1, "one", <FaChessRook/>],
    //         y2: [2, "two", <FaChessPawn/>],
    //         y3: [3, "three", <></>],
    //         y4: [4, "four", <></>],
    //         y5: [5, "five", <></>],
    //         y6: [6, "six", <></>],
    //         y7: [7, "seven", <FaChessPawn/>],
    //         y8: [8, "eight", <FaChessRook/>]
    //         }
    // const b = {
    //         y1: [1, "one", <FaChessKnight/>],
    //         y2: [2, "two", <FaChessPawn/>],
    //         y3: [3, "three", <></>],
    //         y4: [4, "four", <></>],
    //         y5: [5, "five", <></>],
    //         y6: [6, "six", <></>],
    //         y7: [7, "seven", <FaChessPawn/>],
    //         y8: [8, "eight", <FaChessKnight/>]
    //         }
    // const c = {
    //         y1: [1, "one", <FaChessBishop/>],
    //         y2: [2, "two", <FaChessPawn/>],
    //         y3: [3, "three", <></>],
    //         y4: [4, "four", <></>],
    //         y5: [5, "five", <></>],
    //         y6: [6, "six", <></>],
    //         y7: [7, "seven", <FaChessPawn/>],
    //         y8: [8, "eight", <FaChessBishop/>]
    //         }
    // const d = {
    //         y1: [1, "one", <FaChessKing/>],
    //         y2: [2, "two", <FaChessPawn/>],
    //         y3: [3, "three", <></>],
    //         y4: [4, "four", <></>],
    //         y5: [5, "five", <></>],
    //         y6: [6, "six", <></>],
    //         y7: [7, "seven", <FaChessPawn/>],
    //         y8: [8, "eight", <FaChessKing/>]
    //         }
    // const e = {
    //         y1: [1, "one", <FaChessQueen/>],
    //         y2: [2, "two", <FaChessPawn/>],
    //         y3: [3, "three", <></>],
    //         y4: [4, "four", <></>],
    //         y5: [5, "five", <></>],
    //         y6: [6, "six", <></>],
    //         y7: [7, "seven", <FaChessPawn/>],
    //         y8: [8, "eight", <FaChessQueen/>]
    //         }
    // const f = {
    //         y1: [1, "one", <FaChessBishop/>],
    //         y2: [2, "two", <FaChessPawn/>],
    //         y3: [3, "three", <></>],
    //         y4: [4, "four", <></>],
    //         y5: [5, "five", <></>],
    //         y6: [6, "six", <></>],
    //         y7: [7, "seven", <FaChessPawn/>],
    //         y8: [8, "eight", <FaChessBishop/>]
    //         }
    // const g = {
    //         y1: [1, "one",<FaChessKnight/>],
    //         y2: [2, "two", <FaChessPawn/>],
    //         y3: [3, "three", <></>],
    //         y4: [4, "four", <></>],
    //         y5: [5, "five", <></>],
    //         y6: [6, "six", <></>],
    //         y7: [7, "seven", <FaChessPawn/>],
    //         y8: [8, "eight",<FaChessKnight/>]
    //         }
    // const h = {
    //         y1: [1, "one", <FaChessRook/>],
    //         y2: [2, "two", <FaChessPawn/>],
    //         y3: [3, "three", <></>],
    //         y4: [4, "four", <></>],
    //         y5: [5, "five", <></>],
    //         y6: [6, "six", <></>],
    //         y7: [7, "seven", <FaChessPawn/>],
    //         y8: [8, "eight", <FaChessRook/>]
    //         }
    
    // const location = [ a, b, c, d, e, f, g, h]
       
   
    return(
        <div className="board-container">
            {rows.map((row, index) =>{
                return(
                    <>
                        {columns.map((column, i) => {
                            if( index % 2 === 0 && i % 2 !== 0){
                                return(
                                    <div className={`${row[1]}${column}`}/>
                                )
                            }else if( index % 2 !== 0 && i % 2 === 0){
                                return(
                                    <div className={`${row[1]}${column}`}/>
                                )
                            }
                            else{
                                return(
                                    <div className={`${row[0]}${column}`}/>
                                )
                            }
                        })}
                        </>
                )
            })}
            
        </div>
    )
}

export default Board