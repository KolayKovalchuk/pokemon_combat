import pokemonAPI from './pokemonAPI.js';

export async function getCombatOpponent(pokemonId) {
    try {
        const response = await pokemonAPI.get(`/combat/opponent/${pokemonId}`)
        return response.data
    }
    catch (error) {
        console.log('fetch pockemons error: ', error)
        return []

    }
}