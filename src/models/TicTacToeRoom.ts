import type { TicTacToeSocket } from '@/lib/types';
import TicTacToe from './TicTacToe';

export default class TicTacToeRoom {
    private players: TicTacToeSocket[];
    private game: TicTacToe;

    constructor() {
        this.players = [];
        this.game = new TicTacToe();
    }

    // Tengo que añadir jugadores a la sala
    addPlayer(player: TicTacToeSocket): boolean {
        if (this.players.length < 2) {
            this.players.push(player);
            return true;
        } else {
            return false;
        }
    }

    // Tengo que eliminar jugadores de la sala
    removePlayer(player: TicTacToeSocket): void {
        const playerIdx = this.players.indexOf(player);

        if (playerIdx === -1) return;

        this.players.splice(playerIdx);
    }

    // Tengo que limpiar el estado de la sala
    // Tengo que empezar el juego de la sala
}
