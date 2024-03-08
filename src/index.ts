import express from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';

const requestListener = express();
const server = createServer(requestListener);
const io = new Server(server);
const port = process.env.PORT || 8080;

requestListener.get('/', (_, res) => {
    res.send('<h1>Not allowed!</h1>');
});

io.on('connection', socket => {
    console.log('A user has connected with this info: ', socket);
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
