const {engineMoves} = require("./helpers");
const boradValues = require('./assets/boardValues')

 
const vasslesValue = {
    pawnValue: 100,
    knightValue: 300,
    bishopValue: 300,
    rookValue: 500,
    queenValue: 900,
}


// const pickMove = (recourse, splitedBoard, whiteTurn, object, indication, whiteBestMove) => {
//     const checkedMoved = indication
//     let WhiteBestMove = whiteBestMove
//     const BestMove = object
//     const playerMoves = engineMoves(splitedBoard, whiteTurn)
//     for (const key in playerMoves) {
//         if (Object.hasOwnProperty.call(playerMoves, key)) {
//             const possibleMoves = playerMoves[key];
//             possibleMoves.forEach( move => {
//                 const demoBoard = [...splitedBoard]
//                 demoBoard[move] = demoBoard[key]
//                 demoBoard[key] = "x"
//                 if(recourse === 1 ){
//                     checkedMoved.initialPosition = Number(key)
//                     checkedMoved.pickedPosition = move
//                 } 
//                 if(whiteTurn){
//                     const whiteEvaluate = whiteEvaluation(demoBoard);
   
//                     if(WhiteBestMove < whiteEvaluate){
//                         WhiteBestMove = whiteEvaluate
//                         // console.log(recourse,"white Evaluation: ", WhiteBestMove);
//                     }
//                 }
//                 if (recourse > 0) {
//                     // console.log(checkedMoved);
//                     console.log(pickMove(recourse - 1, demoBoard, !whiteTurn, BestMove, checkedMoved, WhiteBestMove))
                    
//                 }
//                 else{
//                     const blackEvaluate = blackEvaluation(demoBoard);
//                     const whiteEvaluate = whiteEvaluation(demoBoard);
//                     // console.log(whiteEvaluate);
//                     if(blackEvaluate - whiteEvaluate >= BestMove.evaluation) {
//                         BestMove.evaluation = blackEvaluate - whiteEvaluate
//                         BestMove.initialPosition = checkedMoved.initialPosition
//                         BestMove.pickedPosition = checkedMoved.pickedPosition
//                     }
//                 }
//             })
//         }
//     }
//     return BestMove
// }

const pickMove = (splitedBoard, whiteTurn, object, indication) => {
    const playerMoves = engineMoves(splitedBoard, whiteTurn)
    let whiteWorstEvaluationFromAllBests = -10000

    const checkedMoved = {
        whiteMove: {
            initialPosition: 0,
            atferPosition: 0
        },
        BlackSecondMove: {}
    }
    const BestMove = object

    for (const key in playerMoves) {
        if (Object.hasOwnProperty.call(playerMoves, key)) {
            const possibleMoves = playerMoves[key];
            possibleMoves.forEach( move => {
                const demoBoard = [...splitedBoard]
                demoBoard[move] = demoBoard[key]
                demoBoard[key] = "x"


                const whiteBestEvaluation = depth_2(demoBoard, !whiteTurn)
                const myEvaluate = boardEvaluation(demoBoard, whiteTurn);
                if (whiteWorstEvaluationFromAllBests < myEvaluate - whiteBestEvaluation.BestResult) {

                    whiteWorstEvaluationFromAllBests = myEvaluate - whiteBestEvaluation.BestResult
                    BestMove.initialPosition = Number(key)
                    BestMove.pickedPosition = move

                    checkedMoved.whiteMove.initialPosition = whiteBestEvaluation.check.intialPosition
                    checkedMoved.whiteMove.atferPosition = whiteBestEvaluation.check.afterPosition
                    checkedMoved.BlackSecondMove = whiteBestEvaluation.check.BlackSecondMove
                }
            })
        }
    }
    console.log("Black First Best Move: ", BestMove);
    console.log("white Best Move: ", checkedMoved.whiteMove );
    console.log("Black second Best Move: ", checkedMoved.BlackSecondMove);
    return BestMove
}

const depth_2 = (splitedBoard, whiteTurn) => {
    const playerMoves = engineMoves(splitedBoard, whiteTurn)
    let BestResult = -100000
    const check = {
        BlackSecondMove: {},
        intialPosition: 0,
        afterPosition: 0
    }
    for (const key in playerMoves) {
        if (Object.hasOwnProperty.call(playerMoves, key)) {
            const possibleMoves = playerMoves[key];
            possibleMoves.forEach( move => {

                const demoBoard = [...splitedBoard]
                demoBoard[move] = demoBoard[key]
                demoBoard[key] = "x"

                const blackBestEvaluation = depth_3(demoBoard, !whiteTurn)
                const myEvaluate = boardEvaluation(demoBoard, whiteTurn);
                if(BestResult < myEvaluate - blackBestEvaluation.BestMove){
                    check.BlackSecondMove = blackBestEvaluation.check
                    BestResult = myEvaluate - blackBestEvaluation.BestMove
                    check.intialPosition = Number(key)
                    check.afterPosition = move
                }
            })
        }
    }
    return {BestResult, check}
}

const depth_3 = (splitedBoard, whiteTurn) => {
    const playerMoves = engineMoves(splitedBoard, whiteTurn)
    let BestMove = -100000
    const check = {
        intialPosition: 0,
        afterPosition: 0
    }
    for (const key in playerMoves) {
        if (Object.hasOwnProperty.call(playerMoves, key)) {
            const possibleMoves = playerMoves[key];
            possibleMoves.forEach( move => {

                const demoBoard = [...splitedBoard]
                demoBoard[move] = demoBoard[key]
                demoBoard[key] = "x"

                const myEvaluate = boardEvaluation(demoBoard, whiteTurn);
                const oponentEvaluate = boardEvaluation(demoBoard, !whiteTurn);
                if(BestMove < myEvaluate - oponentEvaluate){
                    BestMove = myEvaluate - oponentEvaluate
                    check.intialPosition = Number(key)
                    check.afterPosition = move
                }
            })
        }
    }
    return {BestMove, check}
}

const boardEvaluation = (board, whiteTurn) => {
    let evaluate = 0
    if (whiteTurn) {
        board.forEach((vassle, vasslePosition) => {
            if(vassle === "p") evaluate += vasslesValue.pawnValue + boradValues.PawnPositionMulti[vasslePosition]
            if(vassle === "r") evaluate += vasslesValue.knightValue + boradValues.RookPositionMulti[vasslePosition]
            if(vassle === "n") evaluate += vasslesValue.bishopValue + boradValues.KnightPositionMulti[vasslePosition]
            if(vassle === "b") evaluate += vasslesValue.rookValue + boradValues.BishopPositionMulti[vasslePosition]
            if(vassle === "q") evaluate += vasslesValue.queenValue + boradValues.QueenPositionMulti[vasslePosition]
        })
    }else{
        board.forEach((vassle, vasslePosition) => {
            if(vassle === "P") evaluate += vasslesValue.pawnValue + [...boradValues.PawnPositionMulti].reverse()[vasslePosition]
            if(vassle === "R") evaluate += vasslesValue.knightValue + [...boradValues.RookPositionMulti].reverse()[vasslePosition]
            if(vassle === "N") evaluate += vasslesValue.bishopValue + [...boradValues.KnightPositionMulti].reverse()[vasslePosition]
            if(vassle === "B") evaluate += vasslesValue.rookValue + [...boradValues.BishopPositionMulti].reverse()[vasslePosition]
            if(vassle === "Q") evaluate += vasslesValue.queenValue + [...boradValues.QueenPositionMulti].reverse()[vasslePosition]
        })
    }
    return evaluate
}


module.exports = pickMove