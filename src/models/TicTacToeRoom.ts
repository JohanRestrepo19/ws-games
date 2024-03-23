import { randomUUID } from 'node:crypto';
import type { TicTacToeSocket } from '@/lib/types';
import TicTacToe, { type Piece } from './TicTacToe';

export type RoomInfo = {
    id: string;
    createdBy: string;
    capacity: number;
    length: number;
};

type Player = {
    id: string;
    socket: TicTacToeSocket;
    piece: Piece;
};

export default class TicTacToeRoom {
    private id: string;
    private createdById: string;
    private players: Player[];
    private availablePiece: Map<Piece, boolean>;
    private capacity: number;
    private game: TicTacToe;

    constructor(playerId: string) {
        this.id = randomUUID();
        this.createdById = playerId;
        this.players = [];
        this.availablePiece = new Map([
            ['X', true],
            ['O', true],
        ]);
        this.capacity = 2;
        this.game = new TicTacToe();
    }

    addPlayer(player: TicTacToeSocket): boolean {
        if (this.players.length >= this.capacity) return false;

        if (this.availablePiece.get('X') === true) {
            this.players.push({ id: player.id, socket: player, piece: 'X' });
            this.availablePiece.set('X', false);
            player.emit('tic-tac-toe/piece:assigned', { piece: 'X' });
            return true;
        }

        if (this.availablePiece.get('O') === true) {
            this.players.push({ id: player.id, socket: player, piece: 'O' });
            this.availablePiece.set('O', false);
            player.emit('tic-tac-toe/piece:assigned', { piece: 'O' });
            return true;
        }

        return false;
    }

    removePlayer(player: TicTacToeSocket): boolean {
        const playerToRemove = this.players.find(p => p.id === player.id);

        if (!playerToRemove) return false;

        this.availablePiece.set(playerToRemove.piece, true);

        this.players = this.players.filter(p => p.id !== player.id);

        player.emit('tic-tac-toe/piece:assigned', { piece: null });

        return true;
    }

    getRoomInfo(): RoomInfo {
        return {
            id: this.id,
            createdBy: this.createdById,
            capacity: this.capacity,
            length: this.players.length,
        };
    }

    getRoomId(): string {
        return this.id;
    }

    getCreatedById(): string {
        return this.createdById;
    }
}
