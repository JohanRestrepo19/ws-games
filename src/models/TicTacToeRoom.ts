import { randomUUID } from 'node:crypto';
import type { ExposableFields, TicTacToeSocket } from '@/lib/types';
import TTT, { type Piece } from './TTT';
import TTTPlayer from './TTTPlayer';

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
    private players: TTTPlayer[];
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
            this.players.push(new TTTPlayer(player.id, player, 'X'));
            this.availablePiece.set('X', false);
            player.emit('tic-tac-toe/piece:assigned', { piece: 'X' });
        } else if (this.availablePiece.get('O') === true) {
            this.players.push(new TTTPlayer(player.id, player, 'O'));
            this.availablePiece.set('O', false);
            player.emit('tic-tac-toe/piece:assigned', { piece: 'O' });
        }

        player.emit('tic-tac-toe/game:updated', {
            game: this.game.getFields(),
        });

        return true;
    }

    removePlayer(player: TicTacToeSocket): boolean {
        const playerToRemove = this.players.find(
            p => p.getFields().id === player.id,
        );

        if (!playerToRemove) return false;

        this.availablePiece.set(playerToRemove.getFields().piece, true);

        this.players = this.players.filter(p => p.getFields().id !== player.id);

        player.emit('tic-tac-toe/piece:assigned', { piece: null });

        //TODO: Need to reset Game State if player leave Room out of nowhere.

        return true;
    }

    isPlayerInRoom(playerId: string): string | undefined {
        const isPlayer = this.players.some(p => p.getFields().id === playerId);
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
            player.getFields().socket.emit('tic-tac-toe/game:updated', {
                game: this.game.getFields(),
            });
        }
    }

    getFields(): TTTRoomExposableFields {
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
