import TicTacToeRoom from './TicTacToeRoom';
import type { TicTacToeSocket } from '@/lib/types';

export default class TicTacToeRoomManager {
    private roomsMap: Map<string, TicTacToeRoom>;

    constructor() {
        this.roomsMap = new Map();
    }

    createRoom(playerId: string): boolean {
        if (this.doesPlayerOwnRoom(playerId)) return false;

        const newRoom = new TicTacToeRoom(playerId);
        this.roomsMap.set(newRoom.getRoomId(), newRoom);
        return true;
    }

    deleteRoom(playerId: string): boolean {
        const room = [...this.roomsMap.values()].find(
            room => room.getCreatedById() === playerId,
        );

        if (!room) return false; // The player has not created a room.

        return this.roomsMap.delete(room.getRoomId());
    }

    getRooms() {
        return [...this.roomsMap.values()].map(room => room.getState());
    }

    addPlayerToRoom(roomId: string, player: TicTacToeSocket): boolean {
        // First, I need to look if requested room exists.
        const room = this.roomsMap.get(roomId);

        if (!room) return false;

        // If It does, then I need to try to connect the player.
        return room.addPlayer(player);
    }

    removePlayerFromRoom(roomId: string, player: TicTacToeSocket): boolean {
        const room = this.roomsMap.get(roomId);

        if (!room) return false;

        return room.removePlayer(player);
    }

    isPlayerInAnyRoom(player: TicTacToeSocket): string | undefined {
        const rooms = [...this.roomsMap.values()];

        for (const room of rooms) {
            const roomId = room.isPlayerInRoom(player.id);
            if (roomId) return roomId;
        }

        return;
    }

    private doesPlayerOwnRoom(playerId: string): boolean {
        return [...this.roomsMap.values()].some(
            room => room.getCreatedById() === playerId,
        );
    }

    printMap() {
        console.log('RoomId -> Room', this.roomsMap);
    }
}
