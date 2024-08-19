import { useCallback, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let _socket;

export const getSocket = () => {
    if (!_socket) {
        _socket = io(process.env.REACT_APP_POKEMON_API_URL);
    }
    return _socket;
};

export default function useSocket() {
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    const [room, setRoom] = useState(null);

    useEffect(() => {
        setIsConnected(socket?.connected || false)
    }, [socket, socket?.connected])

    useEffect(() => {
        const socketIo = getSocket();
        setSocket(socketIo);

        return () => {
            socketIo.disconnect();
            _socket = null
        }
    }, []);

    const joinRoom = useCallback((room) => {
        console.log('joinRoom socket', socket);
        if (socket) {
            console.log('joinning...');
            socket.emit('joinRoom', room);
            setRoom(room)
        }
    }, [socket]);

    const sendMessage = useCallback((msgType, message) => {
        if (socket && room) {
            socket.emit(msgType, room, message);
        }
    }, [socket, room]);

    return {
        socket,
        isConnected,
        joinRoom,
        sendMessage,
        // messages,
        // lastMessage
    }
}
