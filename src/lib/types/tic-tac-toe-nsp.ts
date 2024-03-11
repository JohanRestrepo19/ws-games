import type {Namespace, Socket} from 'socket.io';

// TicTacToe Namespace
interface TicTacToeServerToClientEvents {
    'tic-tac-toe:pong': (payload: {msg: string; number: number}) => void;
}

interface TicTacToeClientToServerEvents {
    'tic-tac-toe:ping': () => void;
}

export type TicTacToeSocket = Socket<
    TicTacToeClientToServerEvents,
    TicTacToeServerToClientEvents
>;

export type TicTacToeNsp = Namespace<
    TicTacToeClientToServerEvents,
    TicTacToeServerToClientEvents
>;
