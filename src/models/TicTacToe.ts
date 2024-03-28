import { GameStateResponse } from '@/lib/types';

// prettier-ignore
const WINNER_SET_POSITIONS: Position[][] = [
    //Rows
    [ {row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2} ],
    [ {row: 1, col: 0}, {row: 1, col: 1}, {row: 1, col: 2} ],
    [ {row: 2, col: 0}, {row: 2, col: 1}, {row: 2, col: 2} ],
    //Cols
    [ {row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0} ],
    [ {row: 0, col: 1}, {row: 1, col: 1}, {row: 2, col: 1} ],
    [ {row: 0, col: 2}, {row: 1, col: 2}, {row: 2, col: 2} ],
    //Diagonals
    [ {row: 0, col: 0}, {row: 1, col: 1}, {row: 2, col: 2} ],
    [ {row: 0, col: 2}, {row: 1, col: 1}, {row: 2, col: 0} ],
];

export type Piece = 'X' | 'O';
export type Cell = Piece | null;
export type Position = { row: number; col: number };
export type State = Piece | 'playing' | 'draw';

/**
 * Represents a Tic Tac Toe Game.
 */
export default class TicTacToe {
    /**
     * The current piece that is making a move.
     */
    public currentPiece: Piece;

    /**
     * The current state of the game.
     */
    private state: State;

    /**
     * The number of availabe moves left in the game.
     */
    private availableMoves: number;

    /**
     * The game board, represented as 3x3 grid of cells.
     */
    private board: Cell[][];

    /**
     * Constructs a new Tic Tac Toe Game.
     * @param [initialPiece='X'] The initial piece to start the game.
     */
    constructor(initialPiece: Piece = 'X') {
        this.currentPiece = initialPiece;
        this.board = [];
        this.state = 'playing';
        this.availableMoves = 9;

        for (let rows = 0; rows < 3; rows++) {
            const row = [null, null, null];
            this.board.push(row);
        }
    }

    /**
     * Makes a move in the game at the specified position.
     * @param position The position on the board to make the move.
     * @returns The current state of the game after the move.
     * @throws Error if the move is not valid.
     * @throws Error if the game has over.
     */
    makeMove(position: Position): State {
        const { row, col } = position;

        // Check for valid move
        if (this.board[row][col]) throw new Error('Not a valid move!');
        if (this.state !== 'playing')
            throw new Error(`Game has over ${this.state} has won`);

        this.board[row][col] = this.currentPiece;
        this.availableMoves--;

        this.checkGameState();

        this.currentPiece = this.currentPiece === 'X' ? 'O' : 'X';
        return this.state;
    }

    /**
     * Checks the current state of the game to determine if a player has won or if it's a draw.
     */
    checkGameState(): void {
        // I have to check inside my board if one of two players has won
        const players = ['X', 'O'] as const;

        for (const player of players) {
            // Check rows, cols and diagonals
            for (const set of WINNER_SET_POSITIONS) {
                const content = set.map<Cell>(
                    ({ row, col }) => this.board[row][col],
                );
                const isWinner = content.every(cell => cell === player);
                if (isWinner) {
                    this.state = player;
                    break;
                }
            }
        }

        // At this point I need to check if is in a Draw State
        if (this.availableMoves === 0) this.state = 'draw';
    }

    /**
     * @returns Returns the current game state.
     */
    getCurrentState(): GameStateResponse {
        return {
            availableMoves: this.availableMoves,
            board: this.board,
            currentPiece: this.currentPiece,
            state: this.state,
        };
    }

    printBoard(): void {
        console.log('my game: ');
        this.board.forEach(row => console.log(row));
        console.log();
    }

    get currentBoard() {
        return this.board;
    }

    get currentAvailableMoves() {
        return this.availableMoves;
    }
}
