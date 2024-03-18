import { randomUUID } from 'node:crypto';
import TicTacToeRoom from './TicTacToeRoom';
import { type TicTacToeSocket } from '@/lib/types';

class TicTacToeRoomManager {
    private rooms: Map<string, TicTacToeRoom>;
    private playersRooms: Map<string, string>;

    constructor() {
        this.rooms = new Map();
        this.playersRooms = new Map();
    }

    create(playerId: string): boolean {
        if (this.playersRooms.has(playerId)) return false;

        const newRoom = new TicTacToeRoom();
        const newRoomId = randomUUID();

        this.rooms.set(newRoomId, newRoom);
        this.playersRooms.set(playerId, newRoomId);

        this.printInnerMaps();

        return true;
    }

    delete(playerId: string): void {
        if (!this.playersRooms.has(playerId)) return;

        const roomId = this.playersRooms.get(playerId) as string;

        this.rooms.delete(roomId);
        this.playersRooms.delete(playerId);

        // TODO: Handle Room clean up for TTTRoom class
    }

    getRooms(): { id: string; createdBy: string }[] {
        const playersIds = [...this.playersRooms.keys()];
        const roomsIds = [...this.rooms.keys()];

        return roomsIds.map((roomId, idx) => {
            return { id: roomId, createdBy: playersIds[idx] };
        });
    }

    printInnerMaps() {
        console.log('Players -> Rooms', this.playersRooms);
        console.log('Rooms -> Game Room', this.rooms);
    }

    addPlayerToRoom(roomId: string, player: TicTacToeSocket): boolean {
        const requestedRoom = this.rooms.get(roomId);

        if (!requestedRoom) return false;

        return requestedRoom.addPlayer(player);
    }

    removePlayerFromRoom(player: TicTacToeSocket) {}
}

export default TicTacToeRoomManager;
