import { randomUUID } from 'node:crypto';
import TicTacToeRoom from './TicTacToeRoom';
import { type TicTacToeSocket } from '@/lib/types';

class TicTacToeRoomManager {
    private rooms: Map<string, TicTacToeRoom>;

    constructor() {
        this.rooms = new Map();
    }

    create(): string {
        const newRoom = new TicTacToeRoom();
        const newRoomId = randomUUID();

        this.rooms.set(newRoomId, newRoom);
        return newRoomId;
    }

    delete(roomId: string): void {
        if (!this.rooms.has(roomId)) return;

        this.rooms.delete(roomId);
    }

    getRooms(): string[] {
        const roomsIds = this.rooms.keys();
        return [...roomsIds];
    }

    addPlayerToRoom(roomId: string, player: TicTacToeSocket) {}
}

export default TicTacToeRoomManager;
