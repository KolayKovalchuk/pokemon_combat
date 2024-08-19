import { useCallback, useContext, useEffect, useState } from 'react';
import useSocket from '../../api/socketService.js';
import { AuthContext } from '../../context/authContext.js';

export default function useCombatSocket(playerPokemon, opponent) {
    const { userAddress } = useContext(AuthContext);
    // const [messages, setMessages] = useState([]);
    // const [lastMessage, setLastMessage] = useState([]);
    // const [isPlayerMove, setIsPlayerMove] = useState([]);
    const [combat, setCombat] = useState({});

    const onMessage = useCallback((message) => {
        console.log('message', message)
    }, [])

    const {
        socket,
        isConnected,
        joinRoom,
        sendMessage,
    } = useSocket(onMessage)

    const startCombat = useCallback(() => {
        sendMessage('startCombat', {
            playerPokemon,
            opponent,
        })
    }, [sendMessage, playerPokemon, opponent])

    const emitAttack = useCallback((attackType, combatId) => {
        sendMessage('emitAttack', {
            attackType,
            combatId
        })
    }, [sendMessage])

    const resign = useCallback(() => {
        console.log(('resign'));
    }, [])

    // Join Combat Room
    useEffect(() => {
        if (isConnected) {
            joinRoom(userAddress)
        }
    },[isConnected, joinRoom, userAddress])

    useEffect(() => {
        if(!socket) return

        socket.on('startCombat', (data) => {
            setCombat(data)
        })

        socket.on('emitAttack', (data) => {
            setCombat(data)
        })
    }, [socket])

    return {
        combat,
        startCombat,
        emitAttack,
        resign,
    }
}