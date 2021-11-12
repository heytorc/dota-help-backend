require('dotenv').config();

import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import routes from './routes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
});

app.use(express.json());
app.use(cors());
app.use(routes);

server.listen(process.env.PORT || 4000, () => console.log('server started!'));

app.locals.io = io;