import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';

import type { MainNsp, TicTacToeNsp } from './lib/types';

const requestListener = express();
const server = createServer(requestListener);
const port = process.env.PORT || 8080; //TODO: Install dotevn

export const io = new Server(server, {
    cors: { origin: 'http://localhost:3000' }, // Client url
});

// ======= Main Namespace =======
const mainNsp: MainNsp = io.of('/');

mainNsp.on('connection', socket => {
    console.log('New connection to Main NSP, ', socket.id);

    // Event Listeners.
    socket.on('disconnect', reason => {
        console.log('Reason: ', reason);
    });

    socket.on('main:ping', () => {
        console.log('Ping test message');
        socket.emit('main:pong', 'Hello world');
    });

    // Event Emmiters.
});

// ======= TicTacToe Namespace =======
const ticTacToeNsp: TicTacToeNsp = io.of('/tic-tac-toe');

ticTacToeNsp.on('connection', socket => {
    console.log('New connection to TicTacToe NSP, ', socket.id);

    // Event Listeners.
    socket.on('disconnect', reason => {
        console.log('Reason: ', reason);
    });

    socket.on('tic-tac-toe:ping', () => {
        socket.emit('tic-tac-toe:pong', { msg: 'hola', number: 19 });
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
