import { allOponentMoves, findTheKing } from "./helpers"

export const casstle = (border, intPosition, pieceType, splitedBoard) => {
    const casstleLeft = [ intPosition - 1, intPosition - 2]
    const casstleRight = [intPosition + 1, intPosition + 2, intPosition + 3]
    const cassels = []
    if (splitedBoard[casstleLeft[0]] === "x" && splitedBoard[casstleLeft[1]] === "x") cassels.push(casstleLeft)
    if (splitedBoard[casstleRight[0]] === "x" && splitedBoard[casstleRight[1]] === "x" && splitedBoard[casstleRight[2]] === "x") cassels.push(casstleRight)

    return cassels
}

export const eatPeice = (border, intPosition, pieceType, splitedBoard, direction, index, forward) => {
    const black = ['K', 'R', 'N', 'B', 'Q', 'B', 'N', 'R', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P']
    const white = ['k', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'r', 'n', 'b', 'q', 'b', 'n', 'r']
    
    if (pieceType === "b" && black.includes(splitedBoard[direction])){
            if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction;

    }else if (pieceType === "B" && white.includes(splitedBoard[direction])){
        if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction;
    }    

    if (pieceType === "n" &&  black.includes(splitedBoard[intPosition + direction])) return (intPosition + direction);
    else if (pieceType === "N" && white.includes(splitedBoard[intPosition + direction])) return (intPosition + direction);
    

    if (pieceType === "r" && black.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction
        
    }else if (pieceType === "R" && white.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction    
    } 

    if (pieceType === "q" && black.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction

    }else if (pieceType === "Q" && white.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction
    } 

    if (pieceType === "k" && black.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction

    }else if (pieceType === "K" && white.includes(splitedBoard[direction])){
        if (forward === undefined) return direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return direction
    } 

    if (pieceType === "p" && black.includes(splitedBoard[intPosition + direction])){
        if (forward === undefined) return intPosition + direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return intPosition + direction

    }else if (pieceType === "P" && white.includes(splitedBoard[intPosition + direction])){
        if (forward === undefined) return intPosition + direction
        else if (forward ? intPosition + index*1 <= border : intPosition - index*1 >= border - 7) return intPosition + direction
    } 
}

export const check = (board, whiteTurn) => {
    const oponentMoves = allOponentMoves(board, whiteTurn)
    const kingPosition = findTheKing(board, whiteTurn)
    let isCheck = oponentMoves.includes(kingPosition)
    // isCheck && console.log("You're on check");
    return isCheck
}

export const checkmate = (board, whiteTurn) => {
    const ischeck = check(board, whiteTurn) 
    const myMoves = allOponentMoves(board, !whiteTurn)
    const oponentMoves = allOponentMoves(board, whiteTurn)
    console.log('oponent moves' , oponentMoves);
    console.log("my moves" , myMoves);
}