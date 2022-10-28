import { kingMovment } from "./movements"
import { check } from "./rules"
import { bishopSimulation, kingSimulation, knightSimulation, pawnSimulation, queenSimulation, rookSimulation } from "./simulation"

export const allOponentMoves = (board, whiteTurn) => {
    const borders = [[56, 63], [48, 55], [40, 47], [32, 39], [24, 31], [16, 23], [8, 15], [0, 7]]
    const pieces = [
        { type : "p", vassleMoves: pawnSimulation },{ type : "n", vassleMoves: knightSimulation },{ type : "r", vassleMoves: rookSimulation },{ type : "b", vassleMoves: bishopSimulation },{ type : "q", vassleMoves: queenSimulation }, { type : "k", vassleMoves: kingSimulation }] 
    
    const oponentMoves = []
    if (whiteTurn){
        board.forEach((pieceType, position) => {
            borders.forEach((border) => {
                if (position <= border[1] && position >= border[0]) {
                    pieces.forEach ((piece) =>{
                        pieceType === piece.type.toUpperCase() && piece.vassleMoves(border[1], position, pieceType, board).forEach((element) => {
                            element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                    })
                        // pieceType === piece.type.toUpperCase() &&  oponentMoves.push(piece.vassleMoves(border[1], position, pieceType, board))
                    })
                }
            })
        })
    }else{
        board.forEach((pieceType, position) => {
            borders.forEach((border) => {
                if (position <= border[1] && position >= border[0]) {
                    pieces.forEach ((piece) =>{
                        pieceType === piece.type && piece.vassleMoves(border[1], position, pieceType, board).forEach((element) => {
                            element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                        })
                    })
                }
            })
        })
    }
    return oponentMoves
}

export const findTheKing = (board, whiteTurn) => {
    let kingPosition = undefined
        board.forEach((pieceType, position) => {
            if(whiteTurn){
               if (pieceType === "k") kingPosition = position
            }else{
                if (pieceType === "K") kingPosition = position
            }
        })
    return kingPosition
}

export const validMovesInCheck = (board, whiteTurn) => {

    const validMoves = []
    const myMoves = allOponentMoves(board, !whiteTurn)
    if(check(board, whiteTurn)){
        myMoves.forEach( move => {
            const demoBoard = [...board]
            demoBoard[move] = "p"
            !check(demoBoard, whiteTurn) && validMoves.push(move)
        })
    } 
    return validMoves
}

export const kingValidMovesInCheck = (board, whiteTurn, KingPosition, kingPossibleMoves) => {
    const validMoves = []
        kingPossibleMoves.forEach(move => {
            const demoBoard = [...board]
            demoBoard[move] = "k"
            demoBoard[KingPosition] = "x"
            !check(demoBoard, whiteTurn) && validMoves.push(move)
        })
    return validMoves
}

