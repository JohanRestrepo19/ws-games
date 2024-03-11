// TicTacToe Namespace
export interface TicTacToeServerToClientEvents {
    pong: (payload: {msg: string; number: number}) => void;
}

export interface TicTacToeClientToServerEvents {
    ping: () => void;
}
