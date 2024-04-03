import { randomUUID } from 'node:crypto';
import TTT, { type Piece } from './TTT';
import type { ExposableFields, TicTacToeSocket } from '@/lib/types';

type Player = {
    id: string;
    socket: TicTacToeSocket;
    piece: Piece;
};

export type TTTRoomExposableFields = {
    id: string;
    createdBy: string;
    capacity: number;
    length: number;
};

export default class TicTacToeRoom
    implements ExposableFields<TTTRoomExposableFields>
{
    private id: string;
    private createdById: string;
    private players: Player[];
    private availablePiece: Map<Piece, boolean>;
    private capacity: number;
    private game: TTT;

    constructor(playerId: string) {
        this.id = randomUUID();
        this.createdById = playerId;
        this.players = [];
        this.availablePiece = new Map([
            ['X', true],
            ['O', true],
        ]);
        this.capacity = 2;
        this.game = new TTT();
    }

    addPlayer(player: TicTacToeSocket): boolean {
        if (this.players.length >= this.capacity) return false;

        if (this.availablePiece.get('X') === true) {
            this.players.push({ id: player.id, socket: player, piece: 'X' });
            this.availablePiece.set('X', false);
            player.emit('tic-tac-toe/piece:assigned', { piece: 'X' });
        } else if (this.availablePiece.get('O') === true) {
            this.players.push({ id: player.id, socket: player, piece: 'O' });
            this.availablePiece.set('O', false);
            player.emit('tic-tac-toe/piece:assigned', { piece: 'O' });
        }

        player.emit('tic-tac-toe/game:updated', {
            game: this.game.getState(),
        });

        return true;
    }

    removePlayer(player: TicTacToeSocket): boolean {
        const playerToRemove = this.players.find(p => p.id === player.id);

        if (!playerToRemove) return false;

        this.availablePiece.set(playerToRemove.piece, true);

        this.players = this.players.filter(p => p.id !== player.id);

        player.emit('tic-tac-toe/piece:assigned', { piece: null });

        return true;
    }

    isPlayerInRoom(playerId: string): string | undefined {
        const isPlayer = this.players.some(p => p.id === playerId);
        if (!isPlayer) return;
        return this.id;
    }

    startGame() {
        this.game.startGame();
        this.notifyGameUpdate();
    }

    restartGame() {
        this.game.setGame();
        this.notifyGameUpdate();
    }

    private notifyGameUpdate() {
        for (const player of this.players) {
            player.socket.emit('tic-tac-toe/game:updated', {
                game: this.game.getState(),
            });
        }
    }

    getState(): TTTRoomExposableFields {
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
