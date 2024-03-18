import type { Namespace, Socket } from 'socket.io';

// TicTacToe Namespace
type Room = { id: string; createdBy: string };

// [namespace]/[resource]:[action in participle past]:
interface TicTacToeServerToClientEvents {
    'tic-tac-toe/pong:sent': (payload: { msg: string; number: number }) => void;
    'tic-tac-toe/rooms:updated': (response: { rooms: Room[] }) => void;
    // NOTE: Maybe it's better to use acknowlegments in this case.
    'tic-tac-toe/rooms:connected': (response: {connected: boolean, msg: string}) => void;
}

// [namespace]/[resource]:[action in present]:
interface TicTacToeClientToServerEvents {
    'tic-tac-toe/ping:send': () => void;
    'tic-tac-toe/room:create': () => void;
    'tic-tac-toe/room:delete': () => void;
    'tic-tac-toe/room:connect': () => void;
    'tic-tac-toe/room:disconnect': () => void; // NOTE: Maybe it's better to use acknowlegments in this case.
}

export type TicTacToeSocket = Socket<
    TicTacToeClientToServerEvents,
    TicTacToeServerToClientEvents
>;

export type TicTacToeNsp = Namespace<
    TicTacToeClientToServerEvents,
    TicTacToeServerToClientEvents
>;
