import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import type {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from './lib/types';

const requestListener = express();
const server = createServer(requestListener);

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server, {
    cors: {origin: 'http://localhost:3000'}, // Client url
});

const port = process.env.PORT || 8080; //TODO: Install dotevn

io.on('connection', socket => {
    console.log('A new connection has been established: ', socket.id);

    socket.on('disconnect', reason => {
        console.log('Reason: ', reason);
    });

    socket.on('ping', () => {
        console.log('Mensaje de prueba de ping');
        socket.emit('pong', 'Hello world');
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
