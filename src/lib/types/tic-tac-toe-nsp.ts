import type { Namespace, Socket } from 'socket.io';
import type { State, Cell, Piece } from '@/models/TicTacToe';

// TicTacToe Namespace
export enum ResponseStatus {
    Successful = 'successful',
    Unsuccessful = 'unsuccessful',
}

export type GameStateResponse = {
    availableMoves: number;
    board: Cell[][];
    currentPiece: Piece;
    state: State;
};

export type RoomResponse = {
    status: ResponseStatus;
    msg?: string;
};

export type TicTacToeRoomState = {
    id: string;
    createdBy: string;
    capacity: number;
    length: number;
};

// [namespace]/[resource]:[action in participle past]:
interface TicTacToeServerToClientEvents {
    'tic-tac-toe/pong:sent': (payload: { msg: string; number: number }) => void;
    'tic-tac-toe/rooms:updated': (response: {
        rooms: TicTacToeRoomState[];
    }) => void;
    'tic-tac-toe/piece:assigned': (response: { piece: Piece | null }) => void;
    'tic-tac-toe/game:updated': (response: { game: GameStateResponse }) => void;
}

// [namespace]/[resource]:[action in present]:
interface TicTacToeClientToServerEvents {
    'tic-tac-toe/ping:send': () => void;
    'tic-tac-toe/room:create': () => void;
    'tic-tac-toe/room:delete': () => void;

    'tic-tac-toe/room:join': (
        roomId: string,
        cb: (response: RoomResponse) => void,
    ) => void;

    'tic-tac-toe/room:leave': (
        roomId: string,
        cb: (response: RoomResponse) => void,
    ) => void;

    'tic-tac-toe/room:disconnect': () => void;
}

export type TicTacToeSocket = Socket<
    TicTacToeClientToServerEvents,
    TicTacToeServerToClientEvents
>;

export type TicTacToeNsp = Namespace<
    TicTacToeClientToServerEvents,
    TicTacToeServerToClientEvents
>;
