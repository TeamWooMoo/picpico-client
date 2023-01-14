import { io } from 'socket.io-client';
import { CREDENTIAL } from '../config.js';

export function getSocket() {
  const socketOptions = { withCredentials: CREDENTIAL.withCredentials };
  const SERVER = 'https://picpico-server.site';

  const socket = io(SERVER, socketOptions);
  return socket;
}

export async function joinRoom(socket, roomId) {
  socket.emit('join_room', roomId, socket.id);
  console.log('[join room] - emit - client');
}
