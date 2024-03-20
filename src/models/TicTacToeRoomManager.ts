import TicTacToeRoom, { type RoomInfo } from './TicTacToeRoom';
import type { TicTacToeSocket } from '@/lib/types';

class TicTacToeRoomManager {
    private roomsMap: Map<string, TicTacToeRoom>;

    constructor() {
        this.roomsMap = new Map();
    }

    create(playerId: string): boolean {
        if (this.doesPlayerOwnRoom(playerId)) return false;

        const newRoom = new TicTacToeRoom(playerId);
        this.roomsMap.set(newRoom.getRoomId(), newRoom);
        return true;
    }

    delete(playerId: string): boolean {
        const room = [...this.roomsMap.values()].find(
            room => room.getCreatedById() === playerId,
        );

        if (!room) return false; // The player has not created a room.

        return this.roomsMap.delete(room.getRoomId());
    }

    getRooms(): RoomInfo[] {
        return [...this.roomsMap.values()].map(room => room.getRoomInfo());
    }

    addPlayerToRoom(roomId: string, player: TicTacToeSocket): boolean {
        return true;
    }

    removePlayerFromRoom(player: TicTacToeSocket) {}

    private doesPlayerOwnRoom(playerId: string): boolean {
        return [...this.roomsMap.values()].some(
            room => room.getCreatedById() === playerId,
        );
    }

    printMap() {
        console.log('RoomId -> Room', this.roomsMap);
    }
}

export default TicTacToeRoomManager;
