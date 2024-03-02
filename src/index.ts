import TicTacToe, {type GameState} from '@/models/TicTacToe';

function main() {
    const game = new TicTacToe('O');
    let gameResult: GameState;

    gameResult = game.makeMove({row: 0, col: 0});
    console.log('Winner from main: ', gameResult);

    gameResult = game.makeMove({row: 1, col: 0});
    console.log('Winner from main: ', gameResult);

    gameResult = game.makeMove({row: 0, col: 1});
    console.log('Winner from main: ', gameResult);

    gameResult = game.makeMove({row: 1, col: 1});
    console.log('Winner from main: ', gameResult);

    gameResult = game.makeMove({row: 0, col: 2});
    console.log('Winner from main: ', gameResult);

    gameResult = game.makeMove({row: 1, col: 2});
    console.log('Winner from main: ', gameResult);
}

//TODO: Test my TicTacToe class
main();
