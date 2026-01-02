import { Server, Socket } from 'socket.io';

export function registerChatHandlers(io: Server, socket: Socket) {
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });
}