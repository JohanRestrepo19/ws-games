import TicTacToe, { type Piece } from '@/models/TicTacToe';

describe('Test TicTacToe Class', () => {
    let game: TicTacToe;

    beforeEach(() => {
        game = new TicTacToe();
    });

    describe('Initialization', () => {
        test('Should initialize with X', () => {
            expect(game.currentPiece).toBe<Piece>('X');
        });

        test('Should initialize with O', () => {
            game = new TicTacToe('O');
            expect(game.currentPiece).toBe<Piece>('O');
        });

        test('should initialize with available moves set to 9', () => {
            expect(game.currentAvailableMoves).toBe(9);
        });

        test('should initialize with an empty board', () => {
            expect(game.currentBoard).toEqual([
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ]);
        });
    });

    describe('Movements', () => {
        test('should make a valid move and switch player', () => {
            const initialGameState = game.makeMove({ row: 0, col: 0 });
            expect(initialGameState).toBe('playing');
            expect(game.currentPiece).toBe('O');
            expect(game.currentBoard[0][0]).toBe('X');
        });

        test('should not allow making an invalid move', () => {
            game.makeMove({ row: 0, col: 0 });
            expect(() => game.makeMove({ row: 0, col: 0 })).toThrow(
                'Not a valid move!',
            );
        });

        test('should detect a win for X', () => {
            game.makeMove({ row: 0, col: 0 });
            game.makeMove({ row: 1, col: 0 });
            game.makeMove({ row: 0, col: 1 });
            game.makeMove({ row: 1, col: 1 });
            const gameState = game.makeMove({ row: 0, col: 2 });
            expect(gameState).toBe('X');
        });

        test('should detect a win for O', () => {
            game = new TicTacToe('O');
            game.makeMove({ row: 0, col: 0 });
            game.makeMove({ row: 1, col: 0 });
            game.makeMove({ row: 0, col: 1 });
            game.makeMove({ row: 1, col: 1 });
            const gameState = game.makeMove({ row: 0, col: 2 });
            expect(gameState).toBe('O');
        });

        test('should detect a draw when no moves are left', () => {
            game = new TicTacToe('O');
            game.makeMove({ row: 0, col: 0 });
            game.makeMove({ row: 1, col: 1 });
            game.makeMove({ row: 1, col: 0 });
            game.makeMove({ row: 2, col: 0 });
            game.makeMove({ row: 0, col: 2 });
            game.makeMove({ row: 0, col: 1 });
            game.makeMove({ row: 2, col: 1 });
            game.makeMove({ row: 1, col: 2 });

            const gameState = game.makeMove({ row: 2, col: 2 });
            expect(gameState).toBe('draw');
        });
    });
});
