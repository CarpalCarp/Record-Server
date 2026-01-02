import { Server, Socket } from 'socket.io';
import { registerChatHandlers } from './handlers/chat.handler';

export function setupSockets(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log('Made socket connection.', socket.id);

    registerChatHandlers(io, socket);
  });
}
