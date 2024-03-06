import express from 'express';
import {createServer} from 'node:http';

const app = express();
const server = createServer(app);
const port = process.env.PORT || 8080;

app.get('/', (_, res) => {
    res.send('<h1>Hellow World!</h1>');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
