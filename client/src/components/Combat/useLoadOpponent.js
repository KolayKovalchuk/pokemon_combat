import { useCallback, useEffect, useState } from 'react';
import { getCombatOpponent } from '../../api/combatService.js';

export default function useLoadOpponent(pokemonId) {
    const [isLoading, setIsLoading] = useState(true)
    const [opponent, setOpponent] = useState(null)

    const loadOpponent = useCallback(async () => {
        setIsLoading(true)
        const opponent = await getCombatOpponent(pokemonId)
        setOpponent(opponent)
        setIsLoading(false)
    }, [pokemonId])

    useEffect(() => {
        loadOpponent()
    }, [pokemonId, loadOpponent])

    return { opponent, isLoading }
}