import pokemonAPI from './pokemonAPI.js';

export async function getPokemonList(filter) {
    try {
        const response = await pokemonAPI.get('/pokemon', {
            params: {
                types: filter.typeFilter,
                name: filter.name
            }
        })
        return response.data
    }
    catch (error) {
        console.log('fetch pockemons error: ', error)
        return []

    }
}

export async function getPokemonTypesList() {
    try {
        const response = await pokemonAPI.get('/pokemon/types')
        return response.data
    }
    catch (error) {
        console.log('fetch pockemons types error: ', error)
        return []

    }
}