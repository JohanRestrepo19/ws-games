# TODO:

- [x] Define which Web Sockets library to use (Socket.io || WS) -> I'm going with Socket.io
- [x] Define which technology to use on the client (Next.js || React + vite).
- [x] Take a look at Socket io Rooms documentation.
- [x] Define server folder structure.
- [x] From the server I need to define the messages that I will send to the client.

- [ ] Implement Rooms Logic for specific Namespaces/Games.
    - [ ] Define response schema for server emits.
    - [ ] Implement TicTacToe Room Class.
    - [ ] Add custom event for new Socket connections.

- [ ] Figure out how to handle share Event Interfaces in both Client and Server (npm packages).

- [x] Design Rooms Logic for specific Namespaces/Games.

- [ ] Implement Room Manager Class.
    - [x] Investigate which socket field is useful to use as player/socket ID. -> **Socket id** even if it is ephimeral just to not deal with server sessions for the moment.
    - [x] One player/socket should only be able to create one room.
    - [x] Create Room
    - [x] Delete Room. -> This action is restricted to the user who has created the room.
    - [x] Connect player to room.
    - [ ] Disconnect player from room.
        - [x] When click leave room it should leave the room.
        - [x] Not owner player should leave the room without deleting the room he is leaving.
        - [ ] If there is any game going on, when the player disconnects, the game state should be reset.

