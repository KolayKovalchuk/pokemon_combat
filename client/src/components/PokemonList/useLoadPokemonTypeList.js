import { getPokemonTypesList } from '../../api/pokemonService.js';
import { useQuery } from '@tanstack/react-query';

export default function useLoadPokemonTypeList() {
    const { data, error, isFetching } = useQuery({
        queryKey: [],
        queryFn: () => getPokemonTypesList(),
        staleTime: Infinity
    });

    return { pokemonTypeList: data || [], isLoading: isFetching, error };
}