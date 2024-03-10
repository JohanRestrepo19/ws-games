import type {Namespace} from 'socket.io';
import {io} from '..';

interface TicTacToeClientToServerEvents {}
interface TicTacToeServerToClientEvents {}

const ticTacToeNamespace: Namespace<
    TicTacToeClientToServerEvents,
    TicTacToeServerToClientEvents
> = io.of('/tictactoe');

ticTacToeNamespace.on('connect', socket => {
    console.log('New connection to TicTacToe NSP, ', socket.id);
});
