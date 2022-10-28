import "./movment.scss"
import "./position.scss"
import {
    FaChessPawn,
    FaChessKing,
    FaChessQueen,
    FaChessKnight,
    FaChessBishop,
    FaChessRook
} from "react-icons/fa"
import { useState } from "react"
import { bishopMovment, kingMovment, knightMovment, pawnMovment, queenMovment, rookMovment } from "../utils/movements"
import { publicRequest } from "../requestMethods"
import { useEffect } from "react"
import { allMoves, allOponentMoves, findTheKing, validMovesInCheck } from "../utils/helpers"
import { check, checkmate } from "../utils/rules"


const Movment = ({ board, setBoard }) => {
    const splitedBoard = board.split("")


    // for glowing the cubes
    const [possiblePositions, setPossiblePositions] = useState([])
    const [selected, setSelected] = useState(false)
    const [selectedPiece, setSelectedPiece] = useState([])
    const [whiteTurn, setWhiteTurn] = useState(true)
    const [isKingsMoved, setIsKingsMoved] = useState([false, false])
    const [id, setId] = useState("")

    window.sessionStorage.setItem("white", whiteTurn)

    const columns = [1, 2, 3, 4, 5, 6, 7 ,8]
    const rows = [1, 2, 3, 4, 5, 6, 7 ,8]

    const getGame = () => {
        publicRequest.get('/position')
        .then(res => {
            res.data && setId(res.data[0]._id) 
            res.data && setBoard(res.data[0].board)
        })
    }

    const movePieceReq = (body) =>{
        publicRequest.put('/position', body)
            .then((res) => {
                getGame()
            })
            .catch((err) => console.log(err));
    } 
    
    const possibleMovments = (position, arrBoard) => {
        const splitedPosition = position.split(",")
        const intPosition = Number(splitedPosition[0])
        const vassleType = splitedPosition[1]
        
        const borders = [[56, 63], [48, 55], [40, 47], [32, 39], [24, 31], [16, 23], [8, 15], [0, 7]]
        
        setSelected(true)
        setSelectedPiece(splitedPosition)

        borders.forEach((item) => {
            if (intPosition <= item[1] && intPosition >= item[0]) {
                movment(item[1], intPosition, vassleType, arrBoard)
            }
        })
    }

    const movment = (border, position, pieceType, arrBoard) =>{
        const pieces = [
            { type : "p", vassleMoves: pawnMovment },{ type : "n", vassleMoves: knightMovment },{ type : "r", vassleMoves: rookMovment },{ type : "b", vassleMoves: bishopMovment },{ type : "q", vassleMoves: queenMovment },{ type : "k", vassleMoves: kingMovment }] 

        pieces.forEach ((piece) =>{
                pieceType.toLowerCase() === piece.type && setPossiblePositions(piece.vassleMoves(border, position, pieceType, arrBoard, isKingsMoved, whiteTurn))
            })
    }
    //called on the glowing cube
    const movePiece = (position, splitedBoard) => {
        const pieceLocation = Number(selectedPiece[0])
        const pieceType = selectedPiece[1]
        
        if(pieceType === "k" && position === pieceLocation - 2 && !isKingsMoved[1]){
            splitedBoard[position - 1] = "x"
            splitedBoard[position + 1] = "r"
        }
        if(pieceType === "K" && position === pieceLocation - 2 && !isKingsMoved[0]){
            splitedBoard[position - 1] = "x"
            splitedBoard[position + 1] = "R"
        }

        if(pieceType === "k" && position === pieceLocation + 2 && !isKingsMoved[1]){
            splitedBoard[position + 2] = "x"
            splitedBoard[position - 1] = "r"
        }
        if(pieceType === "K" && position === pieceLocation + 2 && !isKingsMoved[0]){
            splitedBoard[position + 2] = "x"
            splitedBoard[position - 1] = "R"
        }
        splitedBoard[position] = pieceType
        splitedBoard[pieceLocation] = "x"
        setSelected(false)
        // console.log(selectedPiece);
        validMovesInCheck(splitedBoard, !whiteTurn, selectedPiece[1], position)
        setPossiblePositions([])
        const body = {
            _id: id, 
            board: splitedBoard.join(""),
            white: !whiteTurn 
        }

        if (pieceType === "K"){
            setIsKingsMoved([true, isKingsMoved[1]])
            body.isBlackKingMoved = true
        }else if (pieceType === "k"){
            setIsKingsMoved([isKingsMoved[0], true])
            body.isWhiteKingMoved = true
        }
        movePieceReq(body)
        setBoard(splitedBoard.join(""))
        setWhiteTurn(!whiteTurn)
        check(splitedBoard, !whiteTurn)
    }
    // useEffect(() => {
    //     publicRequest.put('/position', {
    //         "_id" : "635a7e13b45f7777529539c4",
    //         "board": "RNBKQBNRPPPPPPPPxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxpppppppprnbkqbnr",
    //         "white": "true"
    //     }).then((res) => {
    //         getGame()
    //     })
    //     .catch((err) => console.log(err));
    // },[])

    return(
        <>           
        <div className={selected ? "selected" :"positions-container"}>
        {rows.map((row, index) =>{
            return(
                <>
                    {columns.map((column, i) => {
                        if(possiblePositions.includes(i + 8*index)){
                            return(
                                <button className={`possible-move`} onClick={() => movePiece(i + 8*index, splitedBoard)}>
                                    <span>{((i)+ 8*index)}</span>
                                </button>
                            )
                        }else{
                            return(
                                <button className={` center }`} onClick={() => {
                                    setSelected(false)
                                    setPossiblePositions([])
                                }}>
                                    <span>{((i)+ 8*index)}</span>
                                </button>
                            )
                        }
                    })}
                </>
            )
        })}
    </div>
        <div className="vassels-container">

            {splitedBoard.map((vassle, i) => {
                
                const black = ['R', 'N', 'B', 'K', 'Q', 'B', 'N', 'R', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']
                const white = ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'r', 'n', 'b', 'k', 'q', 'b', 'n', 'r']

                if ( vassle !== "x" ){

                    if ( white.includes(vassle) ){
                        return(
                            <button className="center" value={[i, vassle]} onClick={(e) =>
                             whiteTurn && 
                             possibleMovments(e.target.value, splitedBoard)}>
                                {vassle === "r" && <FaChessRook className="vassle white"/>}
                                {vassle === "n" && <FaChessKnight className="vassle white"/>}
                                {vassle === "b" && <FaChessBishop className="vassle white"/>}
                                {vassle === "k" && <FaChessKing className="vassle white"/>}
                                {vassle === "q" && <FaChessQueen className="vassle white"/>}
                                {vassle === "p" && <FaChessPawn className="vassle white"/>}
                            </button>
                        )  
                    }
                    else if ( black.includes(vassle) ){
                        return(
                            <button className="center" value={[i, vassle]} onClick={(e) => 
                                !whiteTurn && 
                            possibleMovments(e.target.value, splitedBoard)}>
                                {vassle === "R" && <FaChessRook className="vassle"/>}
                                {vassle === "N" && <FaChessKnight className="vassle"/>}
                                {vassle === "B" && <FaChessBishop className="vassle"/>}
                                {vassle === "K" && <FaChessKing className="vassle"/>}
                                {vassle === "Q" && <FaChessQueen className="vassle"/>}
                                {vassle === "P" && <FaChessPawn className="vassle"/>}
                            </button>
                        )  
                    }
                }else {
                    return(
                        <button className="center" value={i}/>
                    )
                }
            })}
        </div>

        </>
    )
}
export default Movment