import type { ExposableFields } from '@/lib/types';

export type Piece = 'X' | 'O';

export enum State {
    Idle = 'idle',
    Playing = 'playing',
    Draw = 'draw',
    Winner = 'winner',
}

export type TTTExposableFields = {
    state: State;
    turn: Piece | null;
    board: (Piece | null)[][];
    availableMoves: number;
};

export type Position = { row: number; col: number };

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

export default class TTT implements ExposableFields<TTTExposableFields> {
    private state: State;
    private turn: Piece;
    private board: (Piece | null)[][];
    private availableMoves: number;

    constructor(initialTurn: Piece = 'X') {
        this.setGame(initialTurn);
    }

    startGame() {
        this.state = State.Playing;
    }

    puaseGame() {
        this.state = State.Idle;
    }

    setGame(initialTurn: Piece = 'X') {
        this.state = State.Idle;
        this.turn = initialTurn;
        this.board = [];
        this.availableMoves = 9;

        for (let rows = 0; rows < 3; rows++) {
            const row = [null, null, null];
            this.board.push(row);
        }
    }

    makeMove(position: Position) {
        const { row, col } = position;

        if (this.availableMoves === 0) throw new Error('No available moves');
        if (this.board[row][col]) throw new Error('Not a valid move!');
        if (this.state !== State.Playing)
            throw new Error('Not valid state to make a move');

        this.board[row][col] = this.turn;
        this.availableMoves--;

        this.state = this.checkGameState();

        if (this.state === State.Winner || this.state === State.Draw) {
            return;
        }

        this.turn = this.turn === 'X' ? 'O' : 'X';
    }

    private checkGameState(): State {
        const players = ['X', 'O'] as const;

        for (const player of players) {
            for (const set of WINNER_SET_POSITIONS) {
                const content = set.map(({ row, col }) => this.board[row][col]);

                const isWinner = content.every(cell => cell === player);

                if (isWinner) {
                    return State.Winner;
                }
            }
        }

        if (this.availableMoves === 0) {
            return State.Draw;
        }

        return State.Playing;
    }

    getState() {
        return {
            state: this.state,
            turn: this.turn,
            board: this.board,
            availableMoves: this.availableMoves,
        };
    }
}
