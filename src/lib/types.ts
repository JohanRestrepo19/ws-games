export interface ServerToClientEvents {
    pong: (msg: string) => void;
}

export interface ClientToServerEvents {
    ping: () => void;
}

export interface InterServerEvents {}

export interface SocketData {}
