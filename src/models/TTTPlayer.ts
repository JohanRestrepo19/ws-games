import { Socket } from 'socket.io';
import { ExposableFields, TicTacToeSocket } from '@/lib/types';
import { type Piece } from './TTT';

class PlayerInfo<S extends Socket> {
    protected id: string;
    protected socket: S;

    constructor(id: string, socket: S) {
        this.id = id;
        this.socket = socket;
    }
}

type TTTPlayerExposableFields = {
    id: string;
    socket: TicTacToeSocket;
    piece: Piece;
};

export default class TTTPlayer
    extends PlayerInfo<TicTacToeSocket>
    implements ExposableFields<TTTPlayerExposableFields>
{
    private piece: Piece;

    constructor(id: string, socket: TicTacToeSocket, piece: Piece) {
        super(id, socket);
        this.piece = piece;
    }

    getFields(): TTTPlayerExposableFields {
        return {
            id: this.id,
            socket: this.socket,
            piece: this.piece,
        };
    }
}
