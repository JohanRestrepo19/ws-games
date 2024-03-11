import {createServer} from 'node:http';
import express from 'express';
import {Server, Namespace} from 'socket.io';

import type {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
    TicTacToeClientToServerEvents,
    TicTacToeServerToClientEvents,
} from './lib/types';

const requestListener = express();
const server = createServer(requestListener);
const port = process.env.PORT || 8080; //TODO: Install dotevn

export const io = new Server(server, {
    cors: {origin: 'http://localhost:3000'}, // Client url
});

// ======= Main Namespace =======
const mainNsp: Namespace<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
> = io.of('/');

mainNsp.on('connection', socket => {
    console.log('New connection to Main NSP, ', socket.id);

    // Event Listeners.
    socket.on('disconnect', reason => {
        console.log('Reason: ', reason);
    });

    socket.on('ping', () => {
        console.log('Ping test message');
        socket.emit('pong', 'Hello world');
    });

    // Event Emmiters.
});

// ======= TicTacToe Namespace =======
const ticTacToeNsp: Namespace<
    TicTacToeClientToServerEvents,
    TicTacToeServerToClientEvents
> = io.of('/tic-tac-toe');

ticTacToeNsp.on('connection', socket => {
    console.log('New connection to TicTacToe NSP, ', socket.id);

    // Event Listeners.
    socket.on('disconnect', reason => {
        console.log('Reason: ', reason);
    });

    socket.on('ping', () => {
        socket.emit('pong', {msg: 'hola', number: 19});
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
