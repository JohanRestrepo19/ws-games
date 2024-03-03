export type Piece = 'X' | 'O';
export type Cell = Piece | null;
export type Position = {row: number; col: number};
export type GameState = Piece | 'playing' | 'draw';

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

export default class TicTacToe {
    currentPiece: Piece;
    private gameState: GameState;
    private availableMoves: number;
    private board: Cell[][];

    constructor(initialPiece: Piece = 'X') {
        this.currentPiece = initialPiece;
        this.board = [];
        this.gameState = 'playing';
        this.availableMoves = 9;

        for (let rows = 0; rows < 3; rows++) {
            const row = [null, null, null];
            this.board.push(row);
        }
    }

    makeMove(position: Position): GameState {
        const {row, col} = position;

        if (
            this.gameState === 'draw' ||
            this.gameState === 'O' ||
            this.gameState === 'X'
        ) {
            return this.gameState;
        }

        // Check for valid move
        if (this.board[row][col]) throw new Error('Not a valid move!');

        this.board[row][col] = this.currentPiece;
        this.availableMoves--;

        this.checkGameState();

        this.currentPiece = this.currentPiece === 'X' ? 'O' : 'X';
        return this.gameState;
    }

    checkGameState(): void {
        // I have to check inside my board if one of two players has won
        const players = ['X', 'O'] as const;

        for (const player of players) {
            // Check rows, cols and diagonals
            for (const set of WINNER_SET_POSITIONS) {
                const content = set.map<Cell>(
                    ({row, col}) => this.board[row][col],
                );
                const isWinner = content.every(cell => cell === player);
                if (isWinner) {
                    this.gameState = player;
                    break;
                }
            }
        }

        // At this point I need to check if is in a Draw State
        if (this.availableMoves === 0) this.gameState = 'draw';
    }

    printBoard(): void {
        console.log('my game: ');
        this.board.forEach(row => console.log(row));
        console.log();
    }

    get currentBoard() {
        return this.board
    }
}
