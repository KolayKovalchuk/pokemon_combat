import React from 'react';
import { Box } from '@mui/material';
import Loader from '../shared/Loader.js';
import MultipleSelectChip from '../shared/MultiselectChip.js';
import useLoadPokemonTypeList from './useLoadPokemonTypeList.js';
import SearchInput from '../shared/SearchInput.js';

function PokemonFilter({ onTypeChanged, onNameChanged }) {
    const { pokemonTypeList, isLoading } = useLoadPokemonTypeList()
    const typeNameList = pokemonTypeList.map(p => p.english)

    return (
        <Box
            display="flex"
            alignItems={'center'}
        >
            {
                isLoading ?
                    <Loader/>
                    : <>
                        <Box flexGrow={1} bgcolor='white' marginRight={'8px'}><SearchInput onSearch={onNameChanged} /></Box>
                        <MultipleSelectChip flexGrow={2} items={typeNameList} onSelect={onTypeChanged} label='Type'></MultipleSelectChip>
                    </>
            }
        </Box>
    );
};

export default PokemonFilter;
