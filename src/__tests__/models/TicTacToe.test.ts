import TicTacToe, {type Piece} from '@/models/TicTacToe';

describe('Test TicTacToe Class', () => {
    test('Mark correct place', () => {
        const game = new TicTacToe('O');
        const [row, col] = [0, 0];
        game.makeMove({row, col});
        expect(game.currentBoard[row][col]).toBe<Piece>('O');
    });
});
