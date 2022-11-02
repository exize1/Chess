const pickMove = require("./values");
const pickWhtieMove = require("./values");

const engine = (board, whiteTurn) => {
    const splitedBoard = board.split("")

    const engineMoves = EngineMoves(splitedBoard, whiteTurn)
    const playerMoves = EngineMoves(splitedBoard, !whiteTurn)
    const BestMove = pickMove(engineMoves, splitedBoard, playerMoves)
    splitedBoard[BestMove.pickedPosition] = splitedBoard[BestMove.initialPosition]
    splitedBoard[BestMove.initialPosition] = "x"
    const afterMoveBoard = splitedBoard.join("")
    return afterMoveBoard
}




const checkBestmove = () => {

}


const allOponentMoves = (board, whiteTurn) => {
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
                        // pieceType === piece.type.toLowerCase() &&  oponentMoves.push(piece.vassleMoves(border[1], position, pieceType, board))
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

const EngineMoves = (board, whiteTurn) => {
    const borders = [[56, 63], [48, 55], [40, 47], [32, 39], [24, 31], [16, 23], [8, 15], [0, 7]]

    const pieces = [{ type : "p", vassleMoves: pawnMovment },{ type : "n", vassleMoves: knightMovment },{ type : "r", vassleMoves: rookMovment },{ type : "b", vassleMoves: bishopMovment },{ type : "q", vassleMoves: queenMovment }, { type : "k", vassleMoves: kingMovment }] 
    const isRooksMoved = { blackLeft: false, blackRight: false, whiteLeft: false, whiteRight: false }
    const isKingsMoved = [false, false]
    const oponentMoves = {}
    if (whiteTurn){
        board.forEach((pieceType, position) => {
            borders.forEach((border) => {
                if (position <= border[1] && position >= border[0]) {
                    pieces.forEach ((piece) =>{
                        if(pieceType === piece.type){
                            const moves = [] 
                            piece.vassleMoves(border[1], position, pieceType, board, whiteTurn, isKingsMoved, isRooksMoved).forEach((element) => {
                                    element !== undefined && element >= 0 && element <= 63 && moves.push(element)
                                })
                                if(moves.length !== 0) oponentMoves[position] = moves
                        }
                        // pieceType === piece.type.toUpperCase() && piece.vassleMoves(border[1], position, pieceType, board, whiteTurn, isKingsMoved, isRooksMoved).forEach((element) => {
                        //     element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                        // })
                    })
                }
            })
        })
    }else{
        board.forEach((pieceType, position) => {
            borders.forEach((border) => {
                if (position <= border[1] && position >= border[0]) {
                    pieces.forEach ((piece) =>{
                        if(pieceType === piece.type.toUpperCase()){
                            const moves = [] 
                            piece.vassleMoves(border[1], position, pieceType, board, whiteTurn, isKingsMoved, isRooksMoved).forEach((element) => {
                                    element !== undefined && element >= 0 && element <= 63 && moves.push(element)
                                })
                                if(moves.length !== 0) oponentMoves[position] = moves
                        }
                        // pieceType === piece.type.toUpperCase() && piece.vassleMoves(border[1], position, pieceType, board, whiteTurn, isKingsMoved, isRooksMoved).forEach((element) => {
                        //     element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                        // })
                    })
                }
            })
        })
    }
    return oponentMoves
}

const MyMoves = (board, whiteTurn) => {
    const borders = [[56, 63], [48, 55], [40, 47], [32, 39], [24, 31], [16, 23], [8, 15], [0, 7]]
    const pieces = [
        { type : "p", vassleMoves: pawnMovment },{ type : "n", vassleMoves: knightMovment },{ type : "r", vassleMoves: rookMovment },{ type : "b", vassleMoves: bishopMovment },{ type : "q", vassleMoves: queenMovment }, { type : "k", vassleMoves: kingMovment }] 
    const isRooksMoved = {
        blackLeft: false,
        blackRight: false,
        whiteLeft: false,
        whiteRight: false
    }
    const isKingsMoved = [true, true]
    const oponentMoves = []
    if (whiteTurn){
        board.forEach((pieceType, position) => {
            borders.forEach((border) => {
                if (position <= border[1] && position >= border[0]) {
                    pieces.forEach ((piece) =>{
                    //     pieceType === piece.type.toUpperCase() && piece.vassleMoves(border[1], position, pieceType, board).forEach((element) => {
                    //         element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                    // })
                        pieceType === piece.type && piece.vassleMoves(border[1], position, pieceType, board, whiteTurn, isKingsMoved, isRooksMoved).forEach((element) => {
                            element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                        })
                    })
                }
            })
        })
    }else{
        board.forEach((pieceType, position) => {
            borders.forEach((border) => {
                if (position <= border[1] && position >= border[0]) {
                    pieces.forEach ((piece) =>{
                        // pieceType === piece.type && piece.vassleMoves(border[1], position, pieceType, board).forEach((element) => {
                        //     element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                        // })
                        pieceType === piece.type.toUpperCase() && piece.vassleMoves(border[1], position, pieceType, board, whiteTurn, isKingsMoved, isRooksMoved).forEach((element) => {
                            element !== undefined && element >= 0 && element <= 63 && oponentMoves.push(element)
                        })
                    })
                }
            })
        })
    }
    return oponentMoves
}

//check helpers
const findTheKing = (board, whiteTurn) => {
    let kingPosition = undefined
        board.forEach((pieceType, position) => {
            if(whiteTurn){
               if (pieceType === "k") {
                kingPosition = position
            }
            }else{
                if (pieceType === "K") {
                    kingPosition = position
                }
            }
        })
    return kingPosition
}

const isProtectedVassle = (board, whiteTurn, pieceType, piecePosition, piecePossibleMoves) => {
    const validMoves = []
    piecePossibleMoves.forEach(move => {
            const demoBoard = [...board]
            demoBoard[move] = pieceType
            demoBoard[piecePosition] = "x"
            !check(demoBoard, whiteTurn) && validMoves.push(move)
        })
    return validMoves
}

// castling helpers
const kingMoved = (pieceType, setIsKingsMoved, isKingsMoved, body) => {
    if (pieceType === "K"){
        setIsKingsMoved([true, isKingsMoved[1]])
        return body.isBlackKingMoved = true
    }else if (pieceType === "k"){
        setIsKingsMoved([isKingsMoved[0], true])
        return body.isWhiteKingMoved = true
    }
}

const RookMoved = (pieceType, setIsRooksMoved, isRooksMoved, rookPosition) =>{
        if (pieceType === "R" && rookPosition === 0){
            setIsRooksMoved({
                blackLeft: true,
                blackRight: isRooksMoved.blackRight,
                whiteLeft: isRooksMoved.whiteLeft,
                whiteRight: isRooksMoved.whiteRight
            })
        }else if (pieceType === "R" && rookPosition === 7){
            setIsRooksMoved({
                blackLeft: isRooksMoved.blackLeft,
                blackRight: true,
                whiteLeft: isRooksMoved.whiteLeft,
                whiteRight: isRooksMoved.whiteRight
            })
        }else if (pieceType === "r" && rookPosition === 56){
            setIsRooksMoved({
                blackLeft: isRooksMoved.blackLeft,
                blackRight: isRooksMoved.blackRight,
                whiteLeft: true,
                whiteRight: isRooksMoved.whiteRight
            })
        }else if (pieceType === "r" && rookPosition === 63){
            setIsRooksMoved({
                blackLeft: isRooksMoved.blackLeft,
                blackRight: isRooksMoved.blackRight,
                whiteLeft: isRooksMoved.whiteLeft,
                whiteRight: true
            })
        }
}

const isPawnInTheEnd = (pieceType, piecePosition, setSuperPawn, superPawn, setSuperPawnData) => {
    if(pieceType === "P" && piecePosition >= 56 ){
        setSuperPawn([true, superPawn[1]])
        setSuperPawnData([pieceType, piecePosition])
    }
    if(pieceType === "p"  && piecePosition <= 7 ){
        setSuperPawn([superPawn[0], true])
        setSuperPawnData([pieceType, piecePosition])
    }
}

const queenMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn, isKingsMoved, isRooksMoved) => {

    const possiblePositions = 
        rookMovment(border, intPosition, pieceType, splitedBoard, whiteTurn) 
        .concat(bishopMovment(border, intPosition, pieceType, splitedBoard, whiteTurn))
        return(possiblePositions);
}

const pawnMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn) => {

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

    const validMoves = isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, possiblePositions)
    return(validMoves);
}

const knightMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn, isKingsMoved, isRooksMoved) =>{

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
        const validMoves = isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, possiblePositions)
        return(validMoves);
}

const rookMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn, isKingsMoved, isRooksMoved) => {

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
    const validMoves = isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, possiblePositions)
    return(validMoves);
}

const bishopMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn, isKingsMoved, isRooksMoved) => {

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
    const validMoves = isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, possiblePositions)
    return(validMoves);

}

const kingMovment = (border, intPosition, pieceType, splitedBoard, whiteTurn, isKingsMoved, isRooksMoved) => {
    const possiblePositions = []
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
    //castling
    const Casstel = (casstle(intPosition, pieceType, splitedBoard, whiteTurn)) 
    if(!isKingsMoved[0] && pieceType === "K") {
        !isRooksMoved.blackLeft && Casstel[0] && possiblePositions.push(Casstel[0][1])
        !isRooksMoved.blackRight && Casstel[1] && possiblePositions.push(Casstel[1][1])
    }
    if(!isKingsMoved[1] && pieceType === "k") {
        !isRooksMoved.whiteLeft && Casstel[0] && possiblePositions.push(Casstel[0][1])
        !isRooksMoved.whiteRight && Casstel[1] && possiblePositions.push(Casstel[1][1])
    }

    const ValidMovesIncheck = isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, possiblePositions)
    return(ValidMovesIncheck);
        
}

const casstle = ( intPosition, pieceType, splitedBoard, whiteTurn) => {
    const casstleLeft = [intPosition - 1, intPosition - 2, intPosition - 3]
    const casstleRight = [intPosition + 1, intPosition + 2, intPosition + 3, intPosition + 4]
    const cassels = []
    let validMoves = []
    if (splitedBoard[casstleLeft[0]] === "x" && splitedBoard[casstleLeft[1]] === "x") {
        if(splitedBoard[casstleLeft[2]] === "R" || splitedBoard[casstleLeft[2]] === "r") cassels.push(casstleLeft)
    }
    if (splitedBoard[casstleRight[0]] === "x" && splitedBoard[casstleRight[1]] === "x" && splitedBoard[casstleRight[2]] === "x") {
        if(splitedBoard[casstleRight[3]] === "R" || splitedBoard[casstleRight[3]] === "r")cassels.push(casstleRight)
    }
    cassels.forEach(move => {
        validMoves.push(isProtectedVassle(splitedBoard, whiteTurn, pieceType, intPosition, move))
    })
    if(validMoves !== undefined && cassels[0] !== undefined && validMoves[0].length === cassels[0].length ){
        if(validMoves !== undefined && cassels[1] !== undefined && validMoves[1].length === cassels[1].length ){
            return cassels
        }else {
            return [cassels[0]]
        }
    }else if (validMoves !== undefined && cassels[1] !== undefined && validMoves[1].length === cassels[1].length ){
        return [cassels[1]]
    }else return []
}

const eatPeice = (border, intPosition, pieceType, splitedBoard, direction, index, forward) => {
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

const check = (board, whiteTurn) => {
    const oponentMoves = allOponentMoves(board, whiteTurn)
    const kingPosition = findTheKing(board, whiteTurn)
    let isCheck = oponentMoves.includes(kingPosition)
    return isCheck
}

const checkmate = (board, whiteTurn, setIsCheckmate) => {
    const myMoves = MyMoves(board, whiteTurn)
    myMoves.length === 0 && check(board, whiteTurn) && setIsCheckmate(true)
    myMoves.length === 0 && !check(board, whiteTurn) && console.log("Draw")
}

const queenSimulation = (border, intPosition, pieceType, splitedBoard) => {
    const possiblePositions = 
        rookSimulation(border, intPosition, pieceType, splitedBoard)
        .concat(bishopSimulation(border, intPosition, pieceType, splitedBoard))
    return(possiblePositions);
}

const pawnSimulation = (border, intPosition, pieceType, splitedBoard) => {
    const possiblePositions = []

    if (pieceType === "P") {
        intPosition - 1 >= border - 7 && possiblePositions.push(intPosition + 7)
        intPosition + 1 <= border && possiblePositions.push(intPosition + 9)   
    }
    if (pieceType === "p") {
        intPosition - 1 >= border - 7 && possiblePositions.push(intPosition - 9)
        intPosition + 1 <= border && possiblePositions.push(intPosition - 7)
    } 
        
    return(possiblePositions);
}

const knightSimulation = (border, intPosition, pieceType, splitedBoard) =>{
    const possiblePositions = []
    const movmentsOtionsRight = [-6, -15, 17, 10]
    const movmentsOtionsLeft = [-10, -17, 15, 6]
    
        if (intPosition + 1 <= border){
            movmentsOtionsRight.forEach((direction) => {
                if (intPosition + 2 <= border) {
                    possiblePositions.push(intPosition + direction)
                }else {
                    direction !== -6 && direction !== 10 && possiblePositions.push(intPosition + direction)
                }
            })
        }
        if (intPosition - 1 >= border - 7){
            movmentsOtionsLeft.forEach((direction) => {
                if (intPosition - 2 >= border - 7) {
                     possiblePositions.push(intPosition + direction)
                }else {
                     direction !== 6 && direction !== -10 && possiblePositions.push(intPosition + direction)
                }
            })
        }
    return(possiblePositions);

}

const rookSimulation = (border, intPosition, pieceType, splitedBoard) => {
const possiblePositions = []
for (let index = 1; index < 8; index++) {
    const direction = intPosition + 8*index
    if (splitedBoard[direction] !== "x" ) {
        const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index)
        const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index)
        eatingPeice && possiblePositions.push(eatingPeice)
        eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
        break
    }else {
        possiblePositions.push(direction);
    }
}
for (let index = 1; index < 8; index++) {
    const direction = intPosition - 8*index
    if (splitedBoard[direction] !== "x" ){
        const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index)
        const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index)
        eatingPeice && possiblePositions.push(eatingPeice)
        eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
        break
    }else {
        possiblePositions.push(direction);
    }
}
for (let index = 1; index < 8; index++) {
    const direction = intPosition + index
    const forward = true
    if (splitedBoard[intPosition + index] !== "x" && intPosition + index <= 63) {
        const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
        const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)
        eatingPeice && possiblePositions.push(eatingPeice)
        eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
        break
    }else {
        intPosition + index <= border && possiblePositions.push(intPosition + index);
    }
}
for (let index = 1; index < 8; index++) {
    const direction = intPosition - index
    const forward = false
    if (splitedBoard[intPosition - index] !== "x" && intPosition - index >= 0) {
        const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
        const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)
        eatingPeice && possiblePositions.push(eatingPeice)
        eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
        break
    }else {
        intPosition - index >= border - 7 && possiblePositions.push(intPosition - index);
    }
}
return(possiblePositions);
}

const bishopSimulation = (border, intPosition, pieceType, splitedBoard) => {
    const possiblePositions = []
    for (let index = 1; index < 8; index++) {
        const direction = intPosition + index*1 + index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = true
            const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
            const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)

            eatingPeice && possiblePositions.push(eatingPeice)
            eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
            break
        }else {
            intPosition + index*1 <= border && possiblePositions.push(direction);
        }
    }

    for (let index = 1; index < 8; index++) {
        const direction = intPosition + index*1 - index*8
        
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = true
            const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
            const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
            break
        }else {
            intPosition + index*1 <= border && possiblePositions.push(direction);
        }
    }

    for (let index = 1; index < 8; index++) {
        const direction = intPosition - index*1 + index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = false
            const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
            const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
            break
        }else {
            intPosition - index*1 >= border - 7 && possiblePositions.push(direction);
        }
    }
    
    for (let index = 1; index < 8; index++) {
        const direction = intPosition - index*1 - index*8
        if (splitedBoard[direction] !== "x" && direction <= 63) {
            const forward = false
            const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, direction, index, forward)
            const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, direction, index, forward)
            eatingPeice && possiblePositions.push(eatingPeice)
            eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
            break
        }else {
            intPosition - index*1 >= border - 7 && possiblePositions.push(direction);
        }
    }
    return(possiblePositions);

}

const kingSimulation = (border, intPosition, pieceType, splitedBoard, isKingsMoved, whiteTurn) => {
    const possiblePositions = []
    const RightBorder = intPosition + 1 <= border
    const LeftBorder = intPosition - 1 >= border - 7
    
    const directions = [ [9, 1], [-7, 1], [7, -1], [-9, -1], [8, 0], [-8, 0], [1, 1], [-1, -1]]
        directions.forEach( (direction) => {
            if (splitedBoard[intPosition + direction[0]] !== "x") {
                const eatingPeice = eatPeice(border, intPosition, pieceType.toLowerCase(), splitedBoard, intPosition + direction[0])
                const eatingOwnPeice = eatPeice(border, intPosition, pieceType.toUpperCase(), splitedBoard, intPosition + direction[0])
                eatingPeice && possiblePositions.push(eatingPeice)
                eatingOwnPeice && possiblePositions.push(eatingOwnPeice)
            }else {
                if  (RightBorder) direction[0] !== -9 &&  direction[0] !== -1 &&  direction[0] !== 7 &&  possiblePositions.push(intPosition + direction[0])
                if  (LeftBorder) direction[0] !== 9 &&  direction[0] !== 1 &&  direction[0] !== -7 && possiblePositions.push(intPosition + direction[0])
            }
        })
        return(possiblePositions);
}

module.exports =  engine, EngineMoves;
