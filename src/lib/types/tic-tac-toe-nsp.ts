import type { Namespace, Socket } from 'socket.io';

// TicTacToe Namespace
interface TicTacToeServerToClientEvents {
    'tic-tac-toe:pong': (payload: { msg: string; number: number }) => void;
    'tic-tac-toe:room-created': (response: { roomList: string[] }) => void;
}

interface TicTacToeClientToServerEvents {
    'tic-tac-toe:ping': () => void;
    'tic-tac-toe:create-room': () => void;
}

export type TicTacToeSocket = Socket<
    TicTacToeClientToServerEvents,
    TicTacToeServerToClientEvents
>;

export type TicTacToeNsp = Namespace<
    TicTacToeClientToServerEvents,
    TicTacToeServerToClientEvents
>;
