import TTT, { type Piece, State } from '@/models/TTT';

describe('Test TicTacToe Class', () => {
    let game: TTT;

    beforeEach(() => {
        game = new TTT();
    });

    describe('Initialization', () => {
        test('Should initialize with X', () => {
            const gameState = game.getState();
            expect(gameState.turn).toBe<Piece>('X');
        });

        test('Should initialize with O', () => {
            const state = new TTT('O').getState();
            expect(state.turn).toBe<Piece>('O');
        });

        test('Should initialize with available moves set to 9', () => {
            expect(game.getState().availableMoves).toBe(9);
        });

        test('Initial state should be idle', () => {
            expect(game.getState().state).toBe(State.Idle);
        });

        test('Should change to playing state', () => {
            game.startGame();
            expect(game.getState().state).toBe(State.Playing);
        });

        test('Should initialize with an empty board', () => {
            expect(game.getState().board).toEqual([
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ]);
        });
    });

    describe('Movements', () => {
        beforeEach(() => {
            game.startGame();
        });

        test('Should make a valid move and switch player', () => {
            game.makeMove({ row: 0, col: 0 });
            const gameState = game.getState();

            expect(gameState.state).toBe(State.Playing);
            expect(gameState.turn).toBe('O');
            expect(gameState.board[0][0]).toBe('X');
        });

        test('Should not allow making an invalid move', () => {
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
            game.makeMove({ row: 0, col: 2 });

            const gameState = game.getState();

            expect(gameState.turn).toBe('X');
            expect(gameState.state).toBe(State.Winner);
        });

        test('should detect a win for O', () => {
            game = new TTT('O');
            game.startGame();

            game.makeMove({ row: 0, col: 0 });
            game.makeMove({ row: 1, col: 0 });
            game.makeMove({ row: 0, col: 1 });
            game.makeMove({ row: 1, col: 1 });
            game.makeMove({ row: 0, col: 2 });

            const gameState = game.getState();
            expect(gameState.turn).toBe('O');
            expect(gameState.state).toBe(State.Winner);
        });

        test('should detect a draw when no moves are left', () => {
            game = new TTT('O');
            game.startGame();

            game.makeMove({ row: 0, col: 0 });
            game.makeMove({ row: 1, col: 1 });
            game.makeMove({ row: 1, col: 0 });
            game.makeMove({ row: 2, col: 0 });
            game.makeMove({ row: 0, col: 2 });
            game.makeMove({ row: 0, col: 1 });
            game.makeMove({ row: 2, col: 1 });
            game.makeMove({ row: 1, col: 2 });
            game.makeMove({ row: 2, col: 2 });
            const gameState = game.getState();

            expect(gameState.state).toBe(State.Draw);
        });
    });
});
