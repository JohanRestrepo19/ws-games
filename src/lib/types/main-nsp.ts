import type { Socket, Namespace } from 'socket.io';

// Main Namespace

// [namespace]/[resource]:[action in participle past]:
interface ServerToClientEvents {
    'main/pong:sent': (msg: string) => void;
}

// [namespace]/[resource]:[action in present]:
interface ClientToServerEvents {
    'main/ping:send': () => void;
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
