import { randomUUID } from 'node:crypto';
import type { TicTacToeSocket } from '@/lib/types';
import TicTacToe, { type Piece } from './TicTacToe';

export type RoomInfo = {
    id: string;
    createdBy: string;
    capacity: number;
    length: number;
};

export default class TicTacToeRoom {
    private id: string;
    private createdById: string;
    private players: Map<Piece, TicTacToeSocket>;
    private capacity: number;
    private game: TicTacToe;

    constructor(playerId: string) {
        this.id = randomUUID();
        this.createdById = playerId;
        this.players = new Map();
        this.capacity = 2;
        this.game = new TicTacToe();
    }

    addPlayer(player: TicTacToeSocket): boolean {
        if (this.players.size >= this.capacity) return false;

        if (this.players.has('X')) {
            this.players.set('O', player);
            player.emit('tic-tac-toe/piece:assigned', 'O');
        } else {
            this.players.set('X', player);
            player.emit('tic-tac-toe/piece:assigned', 'X');
        }

        return true;
    }

    removePlayer(): void {}

    getRoomInfo(): RoomInfo {
        return {
            id: this.id,
            createdBy: this.createdById,
            capacity: this.capacity,
            length: this.players.size,
        };
    }

    getRoomId(): string {
        return this.id;
    }

    getCreatedById(): string {
        return this.createdById;
    }
}
