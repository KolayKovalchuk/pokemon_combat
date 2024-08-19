import { Server as SocketIOServer } from 'socket.io';
import combatSocket from './combat.socket.js'; // Import your chat logic

export default function setupSocketIO(server) {
    const io = new SocketIOServer(server, {
        cors: {
            origin: '*',
        }
    });

    combatSocket(io);

    return io;
}
