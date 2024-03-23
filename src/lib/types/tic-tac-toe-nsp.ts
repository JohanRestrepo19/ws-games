import type { Namespace, Socket } from 'socket.io';
import { type Piece } from '@/models/TicTacToe';
import { type RoomInfo } from '@/models/TicTacToeRoom';

// TicTacToe Namespace
export enum ResponseStatus {
    Successful = 'successful',
    Unsuccessful = 'unsuccessful',
}

export type RoomResponse = {
    status: ResponseStatus;
    msg?: string;
};

// [namespace]/[resource]:[action in participle past]:
interface TicTacToeServerToClientEvents {
    'tic-tac-toe/pong:sent': (payload: { msg: string; number: number }) => void;
    'tic-tac-toe/rooms:updated': (response: { rooms: RoomInfo[] }) => void;
    'tic-tac-toe/piece:assigned': (response: { piece: Piece | null }) => void;
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
