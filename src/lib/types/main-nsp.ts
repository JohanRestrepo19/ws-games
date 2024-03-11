import type { Socket, Namespace } from 'socket.io';

// Main Namespace
interface ServerToClientEvents {
    'main:pong': (msg: string) => void;
}

interface ClientToServerEvents {
    'main:ping': () => void;
}

interface InterServerEvents {}

interface SocketData {}

export type MainSocket = Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;
export type MainNsp = Namespace<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>;
