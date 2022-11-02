const vasslesValue = {
    pawnValue: 100,
    knightValue: 300,
    bishopValue: 300,
    rookValue: 500,
    queenValue: 900,
}

const boardValue = () => {
    const rows = [1, 2, 3, 4, 5, 6, 7, 8]
    const columns = [1, 2, 3, 4, 5, 6, 7, 8]
    let values = []
    // let check = {
    //     10: 0,
    //     20: 0,
    //     30: 0,
    //     40: 0,
    // }

    rows.forEach((row, i) => {
        columns.forEach((col, index) => {
            if(row === 1 )values.push(10)
            if(col === 1 && row > 1 && row < 8)values.push(10)
            if(row === 2 && col >= 2 && col <= 7)values.push(20)
            if(col === 2 && row > 2 && row < 7)values.push(20)
            if(row === 3 && col >= 3 && col <= 6)values.push(30)
            if(col === 3 && row > 3 && row < 6)values.push(30)
            if(row === 4 && col >= 4 && col <= 5)values.push(40)
            if(row === 5 && col >= 4 && col <= 5)values.push(40)
            if(row === 6 && col >= 3 && col <= 6)values.push(30)
            if(col === 6 && row > 3 && row < 6)values.push(30)
            if(row === 7 && col >= 2 && col <= 7)values.push(20)
            if(col === 7 && row > 2 && row < 7)values.push(20)
            if(row === 8 )values.push(10)
            if(col === 8 &&  row > 1 && row < 8)values.push(10)
        })
    })
    // values.forEach(value => {
    //     if (value === 10) check[10] = check[10] + 1
    //     if (value === 20) check[20] = check[20] + 1
    //     if (value === 30) check[30] = check[30] + 1
    //     if (value === 40) check[40] = check[40] + 1
    // })
    // console.log(values[18]);
    return(values)
}

const pickMove = (myMoves, splitedBoard, playerMoves) => {
    const BestMove = {
        initialPosition: 0,
        pickedPosition: 0,
        evaluation: -100000
    }

    for (const key in myMoves) {
        if (Object.hasOwnProperty.call(myMoves, key)) {
            const possibleMoves = myMoves[key];
            possibleMoves.forEach( move => {
                const demoBoard = [...splitedBoard]
                demoBoard[move] = demoBoard[key]
                demoBoard[key] = "x"
                const evaluate = blackEvaluation(demoBoard);
                const BestOponentMove = pickWhiteMove(playerMoves, demoBoard)
                console.log(key , move ,evaluate - BestOponentMove.evaluation);
                if(evaluate - BestOponentMove.evaluation >= BestMove.evaluation) {
                    BestMove.initialPosition = Number(key)
                    BestMove.pickedPosition = move
                    BestMove.evaluation = evaluate - BestOponentMove.evaluation 
                }
            })
        }
    }
    return BestMove
}

const pickWhiteMove = (whiteMoves, splitedBoard) => {
    const BestMove = {
        initialPosition: 0,
        pickedPosition: 0,
        evaluation: 0
    }

    for (const key in whiteMoves) {
        if (Object.hasOwnProperty.call(whiteMoves, key)) {
            const possibleMoves = whiteMoves[key];
            possibleMoves.forEach( move => {
                const demoBoard = [...splitedBoard]
                demoBoard[move] = demoBoard[key]
                demoBoard[key] = "x"
                const evaluate = whiteEvaluation(demoBoard);
                if(BestMove.evaluation < evaluate) {
                    BestMove.initialPosition = Number(key)
                    BestMove.pickedPosition = move
                    BestMove.evaluation = evaluate
                }
            })
        }
    }
    return BestMove
}

const blackEvaluation = (board) => {
    let evaluate = 0
    const boradValues = boardValue()
    board.forEach((vassle, vasslePosition) => {
        if(vassle === "P") evaluate += vasslesValue.pawnValue + boradValues[vasslePosition]
        if(vassle === "R") evaluate += vasslesValue.knightValue + boradValues[vasslePosition]
        if(vassle === "N") evaluate += vasslesValue.bishopValue + boradValues[vasslePosition]
        if(vassle === "B") evaluate += vasslesValue.rookValue + boradValues[vasslePosition]
        if(vassle === "Q") evaluate += vasslesValue.queenValue + boradValues[vasslePosition]
    })
    return evaluate
}

const whiteEvaluation = (board) => {
    let evaluate = 0
    const boradValues = boardValue()
    board.forEach((vassle, vasslePosition) => {
        if(vassle === "p") evaluate += vasslesValue.pawnValue + boradValues[vasslePosition]
        if(vassle === "r") evaluate += vasslesValue.knightValue + boradValues[vasslePosition]
        if(vassle === "n") evaluate += vasslesValue.bishopValue + boradValues[vasslePosition]
        if(vassle === "b") evaluate += vasslesValue.rookValue + boradValues[vasslePosition]
        if(vassle === "q") evaluate += vasslesValue.queenValue + boradValues[vasslePosition]
    })
    return evaluate
}

module.exports = pickMove, pickWhiteMove