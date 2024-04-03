import type { Namespace, Socket } from 'socket.io';
import type { Piece, TTTExposableFields } from '@/models/TTT';
import type { TTTRoomExposableFields } from '@/models/TicTacToeRoom';

// TicTacToe Namespace
export enum AcknowlegmentStatus {
    Successful = 'successful',
    Unsuccessful = 'unsuccessful',
}

export type AcknowlegmentResponse = {
    status: AcknowlegmentStatus;
    msg?: string;
};

// [namespace]/[resource]:[action in participle past]:
interface TicTacToeServerToClientEvents {
    'tic-tac-toe/pong:sent': (payload: { msg: string; number: number }) => void;
    'tic-tac-toe/rooms:updated': (response: {
        rooms: TTTRoomExposableFields[];
    }) => void;
    'tic-tac-toe/piece:assigned': (response: { piece: Piece | null }) => void;
    'tic-tac-toe/game:updated': (response: {
        game: TTTExposableFields;
    }) => void;
}

// [namespace]/[resource]:[action in present]:
interface TicTacToeClientToServerEvents {
    'tic-tac-toe/ping:send': () => void;
    'tic-tac-toe/room:create': () => void;
    'tic-tac-toe/room:delete': () => void;

    'tic-tac-toe/room:join': (
        roomId: string,
        cb: (response: AcknowlegmentResponse) => void,
    ) => void;

    'tic-tac-toe/room:leave': (
        roomId: string,
        cb: (response: AcknowlegmentResponse) => void,
    ) => void;

    'tic-tac-toe/game:start': (
        roomId: string,
        cb: (response: AcknowlegmentResponse) => void,
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
