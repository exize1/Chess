import { allOponentMoves, kingValidMovesInCheck, validMovesInCheck } from "./helpers"
import { casstle, check, eatPeice } from "./rules"
    
const isWhiteTurn = window.sessionStorage.getItem("white") 

export const queenMovment = (border, intPosition, pieceType, splitedBoard) => {
    const possiblePositions = 
        rookMovment(border, intPosition, pieceType, splitedBoard) 
        .concat(bishopMovment(border, intPosition, pieceType, splitedBoard))
        if(check(splitedBoard, isWhiteTurn)){
            const validMoves = []
            possiblePositions.forEach(move => {
                validMovesInCheck(splitedBoard, isWhiteTurn).includes(move) && validMoves.push(move)
            })
            return(validMoves);
        }else{
            return(possiblePositions);
        }
}

export const pawnMovment = (border, intPosition, pieceType, splitedBoard) => {
    const possiblePositions = []

    if (pieceType === "P") {
        intPosition - 1 >= border - 7 && splitedBoard[intPosition + 7]  !== "x" && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, 7))   
        intPosition + 1 <= border && splitedBoard[intPosition + 9]  !== "x" && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, 9))   

        splitedBoard[intPosition + 8] === "x" && possiblePositions.push(intPosition + 8) &&
        splitedBoard[intPosition + 16] === "x" && intPosition <= 15 && possiblePositions.push(intPosition + 16)
    }
    if (pieceType === "p") {
        intPosition - 1 >= border - 7 && splitedBoard[intPosition - 9]  !== "x" && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, -9))
        intPosition + 1 <= border && splitedBoard[intPosition - 7]  !== "x" && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, -7))
        
        splitedBoard[intPosition - 8] === "x" && possiblePositions.push(intPosition - 8) &&
        splitedBoard[intPosition - 16] === "x" && intPosition >= 48 && possiblePositions.push(intPosition - 16)
    } 

    if(check(splitedBoard, isWhiteTurn)){
        const validMoves = []
        possiblePositions.forEach(move => {
            validMovesInCheck(splitedBoard, isWhiteTurn).includes(move) && validMoves.push(move)
        })
        return(validMoves);
    }else{
        return(possiblePositions);
    }
}

export const knightMovment = (border, intPosition, pieceType, splitedBoard) =>{
    const possiblePositions = []
    const movmentsOtionsRight = [-6, -15, 17, 10]
    const movmentsOtionsLeft = [-10, -17, 15, 6]
    
        if (intPosition + 1 <= border){
            movmentsOtionsRight.forEach((direction) => {
                if (intPosition + 2 <= border) {
                    splitedBoard[intPosition + direction] !== "x" ?
                        possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, direction))
                       :possiblePositions.push(intPosition + direction)
                }else {
                    splitedBoard[intPosition + direction] !== "x" ?
                        direction !== -6 && direction !== 10 && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, direction))
                        :direction !== -6 && direction !== 10 && possiblePositions.push(intPosition + direction)
                }
            })
        }
        if (intPosition - 1 >= border - 7){
            movmentsOtionsLeft.forEach((direction) => {
                if (intPosition - 2 >= border - 7) {
                    splitedBoard[intPosition + direction] !== "x" ?
                        possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, direction))
                        :possiblePositions.push(intPosition + direction)
                }else {
                    splitedBoard[intPosition + direction] !== "x" ?
                        direction !== 6 && direction !== -10 && possiblePositions.push(eatPeice(border, intPosition, pieceType, splitedBoard, direction))
                        :direction !== 6 && direction !== -10 && possiblePositions.push(intPosition + direction)
                }
            })
        }
        if(check(splitedBoard, isWhiteTurn)){
            const validMoves = []
            possiblePositions.forEach(move => {
                validMovesInCheck(splitedBoard, isWhiteTurn).includes(move) && validMoves.push(move)
            })
            return(validMoves);
        }else{
            return(possiblePositions);
        }
}

export const rookMovment = (border, intPosition, pieceType, splitedBoard) => {
    const possiblePositions = []
    for (let index = 1; index < 8; index++) {
        const direction = intPosition + 8*index
        if (splitedBoard[direction] !== "x" ) {
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            possiblePositions.push(direction);
        }
    }
    for (let index = 1; index < 8; index++) {
        const direction = intPosition - 8*index
        if (splitedBoard[direction] !== "x" ){
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            possiblePositions.push(direction);
        }
    }
    for (let index = 1; index < 8; index++) {
        const direction = intPosition + index
        const forward = true
        if (splitedBoard[intPosition + index] !== "x" && intPosition + index <= 63) {
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition + index <= border && possiblePositions.push(intPosition + index);
        }
    }
    for (let index = 1; index < 8; index++) {
        const direction = intPosition - index
        const forward = false
        if (splitedBoard[intPosition - index] !== "x" && intPosition - index >= 0) {
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition - index >= border - 7 && possiblePositions.push(intPosition - index);
        }
    }
    if(check(splitedBoard, isWhiteTurn)){
        const validMoves = []
        possiblePositions.forEach(move => {
            validMovesInCheck(splitedBoard, isWhiteTurn).includes(move) && validMoves.push(move)
        })
        return(validMoves);
    }else{
        return(possiblePositions);
    }
}

export const bishopMovment = (border, intPosition, pieceType, splitedBoard) => {
    const possiblePositions = []
    for (let index = 1; index < 8; index++) {
        const direction = intPosition + index*1 + index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = true
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition + index*1 <= border && possiblePositions.push(direction);
        }
    }

    for (let index = 1; index < 8; index++) {
        const direction = intPosition + index*1 - index*8
        
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = true
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition + index*1 <= border && possiblePositions.push(direction);
        }
    }

    for (let index = 1; index < 8; index++) {
        const direction = intPosition - index*1 + index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = false
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition - index*1 >= border - 7 && possiblePositions.push(direction);
        }
    }
    
    for (let index = 1; index < 8; index++) {
        const direction = intPosition - index*1 - index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = false
            const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            break
        }else {
            intPosition - index*1 >= border - 7 && possiblePositions.push(direction);
        }
    }
    if(check(splitedBoard, isWhiteTurn)){
        const validMoves = []
        possiblePositions.forEach(move => {
            validMovesInCheck(splitedBoard, isWhiteTurn).includes(move) && validMoves.push(move)
        })
        return(validMoves);
    }else{
        return(possiblePositions);
    }
}

export const kingMovment = (border, intPosition, pieceType, splitedBoard, isKingsMoved, whiteTurn) => {
    const possiblePositions = []
    const unPossiblePositions = allOponentMoves(splitedBoard, whiteTurn)
    const RightBorder = intPosition + 1 <= border
    const LeftBorder = intPosition - 1 >= border - 7
    
    const directions = [ [9, 1], [-7, 1], [7, -1], [-9, -1], [8, 0], [-8, 0], [1, 1], [-1, -1]]
        directions.forEach( (direction) => {
            if (splitedBoard[intPosition + direction[0]] !== "x") {
                const eatingPeice = eatPeice(border, intPosition, pieceType, splitedBoard, intPosition + direction[0])
                eatingPeice && possiblePositions.push(eatingPeice)
            }else {
                if (RightBorder) direction[0] !== -9 &&  direction[0] !== -1 &&  direction[0] !== 7 &&  possiblePositions.push(intPosition + direction[0])
                if (LeftBorder) direction[0] !== 9 &&  direction[0] !== 1 &&  direction[0] !== -7 && possiblePositions.push(intPosition + direction[0])
            }
        })
        const Casstel = (casstle(border, intPosition, pieceType, splitedBoard))
        
            if(!isKingsMoved[0] && pieceType === "K") {
                Casstel[0] && possiblePositions.push(Casstel[0][1])
                Casstel[1] && possiblePositions.push(Casstel[1][1])
            }
            if(!isKingsMoved[1] && pieceType === "k") {
                Casstel[0] && possiblePositions.push(Casstel[0][1])
                Casstel[1] && possiblePositions.push(Casstel[1][1])
            }
        // console.log(unPossiblePositions);
        const ValidMovesIncheck = kingValidMovesInCheck(splitedBoard, whiteTurn, intPosition, possiblePositions)
        // console.log(kingValidMovesInCheck(splitedBoard, whiteTurn, intPosition, possiblePositions));
        // const validatedPossiblePositions = possiblePositions.filter(val => {if(!unPossiblePositions.includes(val)) return val})
        // console.log(validatedPossiblePositions);
        return(ValidMovesIncheck);
        
}



