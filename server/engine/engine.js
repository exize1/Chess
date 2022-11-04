const pickMove = require("./values");

const engine = (board, whiteTurn) => {
    const checkedMoved = {
        initialPosition: 0,
        pickedPosition: 0,
    }
    const BestMove = {
        initialPosition: 0,
        pickedPosition: 0,
        evaluation: -10000
    }
    let whiteBestMove = -100000
    const splitedBoard = board.split("")
    
    // const isBestMove = pickMove(1, splitedBoard, whiteTurn, BestMove, checkedMoved, whiteBestMove)
    const isBestMove = pickMove(splitedBoard, whiteTurn, BestMove, checkedMoved)
    // if (BestMove.evaluation < isBestMove.evaluation) {
    //     BestMove = isBestMove
    // }
    // console.log(BestMove);
    splitedBoard[BestMove.pickedPosition] = splitedBoard[BestMove.initialPosition]
    splitedBoard[BestMove.initialPosition] = "x"
    const afterMoveBoard = splitedBoard.join("")
    return afterMoveBoard
}




const checkBestmove = () => {

}


module.exports = {
    engine: engine,
}
