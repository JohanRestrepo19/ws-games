import { createServer } from 'node:http';
import express from 'express';
import { Server } from 'socket.io';

const requestListener = express();
const server = createServer(requestListener);
const port = process.env.PORT || 8080; //TODO: Install dotenv

const io = new Server(server, {
    cors: { origin: 'http://localhost:3000' }, // Client url
});

// ======= Main Namespace =======
import type { MainNsp } from '@/lib/types';

const mainNsp: MainNsp = io.of('/');

mainNsp.on('connection', socket => {
    console.log('New connection to Main NSP, ', socket.id);

    // EVENT LISTENERS.
    socket.on('disconnect', reason => {
        console.log('Reason: ', reason);
    });

    socket.on('main/ping:send', () => {
        console.log('Ping test message');
        socket.emit('main/pong:sent', 'Hello world');
    });

    // EVENT EMITTERS.
});

// ======= TicTacToe Namespace =======

import TicTacToeRoomManager from '@/models/TicTacToeRoomManager';
import { type TicTacToeNsp, AcknowlegmentStatus } from '@/lib/types';

const ticTacToeNsp: TicTacToeNsp = io.of('/tic-tac-toe');
const ticTacToeRM = new TicTacToeRoomManager();

ticTacToeNsp.on('connection', socket => {
    // EVENT LISTENERS.
    socket.on('disconnect', () => {
        const hasDeletedRoom = ticTacToeRM.deleteRoom(socket.id);
        const connectedRoomId = ticTacToeRM.isPlayerInAnyRoom(socket);

        // Just send updated rooms if a room was actually deleted.
        if (hasDeletedRoom) {
            ticTacToeNsp.emit('tic-tac-toe/rooms:updated', {
                rooms: ticTacToeRM.getRooms(),
            });
        }

        if (connectedRoomId) {
            ticTacToeRM.removePlayerFromRoom(connectedRoomId, socket);
            ticTacToeRM.restartGame(connectedRoomId);
        }

    });

    socket.on('tic-tac-toe/ping:send', () => {
        socket.emit('tic-tac-toe/pong:sent', { msg: 'hola', number: 19 });
    });

    socket.on('tic-tac-toe/room:create', () => {
        const hasRoomBeenCreated = ticTacToeRM.createRoom(socket.id);

        if (!hasRoomBeenCreated) return;

        const updatedRooms = ticTacToeRM.getRooms();

        ticTacToeNsp.emit('tic-tac-toe/rooms:updated', { rooms: updatedRooms });
    });

    socket.on('tic-tac-toe/room:delete', () => {
        ticTacToeRM.deleteRoom(socket.id);
        ticTacToeNsp.emit('tic-tac-toe/rooms:updated', {
            rooms: ticTacToeRM.getRooms(),
        });
    });

    socket.on('tic-tac-toe/room:join', (roomId, cb) => {
        const hasJoinRoom = ticTacToeRM.addPlayerToRoom(roomId, socket);

        if (!hasJoinRoom) {
            cb({
                status: AcknowlegmentStatus.Unsuccessful,
                msg: 'Requested room is already full',
            });
        }

        ticTacToeRM.printMap();

        cb({ status: AcknowlegmentStatus.Successful });
    });

    socket.on('tic-tac-toe/room:leave', (roomId, cb) => {
        console.log('Im about to remove a player from room');
        const hasLeftRoom = ticTacToeRM.removePlayerFromRoom(roomId, socket);

        if (!hasLeftRoom) {
            cb({
                status: AcknowlegmentStatus.Unsuccessful,
                msg: 'Something went wrong',
            });
        }

        ticTacToeRM.printMap();

        cb({ status: AcknowlegmentStatus.Successful });
    });

    socket.on('tic-tac-toe/game:start', (roomId, cb) => {
        try {
            ticTacToeRM.startGame(roomId);
            cb({
                status: AcknowlegmentStatus.Successful,
            });
            ticTacToeRM.printMap();
        } catch (err) {
            cb({
                status: AcknowlegmentStatus.Unsuccessful,
                msg: err.message,
            });
        }
    });

    // EVENT EMITTERS.
    socket.emit('tic-tac-toe/rooms:updated', {
        rooms: ticTacToeRM.getRooms(),
    });
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
