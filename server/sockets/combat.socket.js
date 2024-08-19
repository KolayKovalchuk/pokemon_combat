import CombatController from '../controllers/combat.controller.js';

export default function combatSocket(io) {
    io.on('connection', (socket) => {
        console.log('!!!!!!!New client connected');

        // Example of joining a room
        socket.on('joinRoom', (roomName) => {
            socket.join(roomName);
            console.log(`Client joined room: ${roomName}`);
        });

        socket.on('startCombat', async (roomName, message) => {
            const { playerPokemon, opponent } = message

            const result = await CombatController.startCombat(roomName, playerPokemon, opponent)
            io.to(roomName).emit('startCombat', result);
            console.log(`startCombat`);
        });

        socket.on('emitAttack', async (roomName, message) => {
            const { attackType, combatId } = message

            const result = await CombatController.processUserAttack(attackType, combatId)
            io.to(roomName).emit('emitAttack', result);
            console.log(`emitAttack`);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}
