import { useQuery } from '@tanstack/react-query'
import { getPokemonList } from '../../api/pokemonService.js';

export default function useLoadPokemonList({ typeFilter, name }) {
    const queryKey = ['pokemonList', { typeFilter: [...typeFilter].sort().toString(), name }];

    const { data, error, isFetching } = useQuery({
        queryKey,
        queryFn: () => getPokemonList({ typeFilter, name }),
        staleTime: Infinity
    });

    return { pokemonList: data || [], isLoading: isFetching, error };
}