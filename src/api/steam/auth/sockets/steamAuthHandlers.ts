import { Socket } from 'socket.io';

export const steamAuthHandlers = (socket: Socket) => {
    socket.on('message', (msg: string) => {
      console.log('Message received:', msg);
      socket.emit('response', `Server received: ${msg}`);
    });
  };