export interface ServerToClientEvents {
    pong: (msg: string) => void;
    basicEmit: (a: number, b: string) => void;
}

export interface ClientToServerEvents {
    ping: () => void;
}

export interface InterServerEvents {}

export interface SocketData {}
