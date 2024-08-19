import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import useDebouncedCallback from '../../lib/useDebouncedCallback.js';

import PokemonCard from './PokemonCard.js';
import Loader from '../shared/Loader.js';
import PokemonFilter from './PokemonFilter.js';
import useLoadPokemonList from './useLoadPokemonList.js';
import useInfiniteScroll from '../shared/useInfiniteScroll.js';


function PokemonList({ onCardClick }) {
    const [typeFilter, setTypeFilter] = useState([])
    const debouncedSetTypeFilter = useDebouncedCallback((typeFilter) => setTypeFilter(typeFilter), 500)

    const [nameFilter, setNameFilter] = useState('')
    const debouncedSetNameFilter = useDebouncedCallback((nameFilter) => setNameFilter(nameFilter), 500)

    const { pokemonList, isLoading } = useLoadPokemonList({
        typeFilter,
        name: nameFilter
    })

    const { scrollRef, visibleItems, isLoading: isScrollLoading } = useInfiniteScroll(pokemonList)

    return (
        <Box
            display="flex"
            flexDirection="column"
            height={'calc(100vh - 110px)'}
        >
            {
                <>
                    <PokemonFilter
                        onTypeChanged={typeFilter => debouncedSetTypeFilter(typeFilter)}
                        onNameChanged={nameFilter => debouncedSetNameFilter(nameFilter)}
                    ></PokemonFilter>
                    {
                        isLoading
                            ? <Loader/>
                            : <>
                                {pokemonList.length > 0 ? (
                                    renderCardList(visibleItems, scrollRef, isScrollLoading, onCardClick)
                                ) : (
                                    <EmptyMessage />
                                )}
                            </>
                    }
                </>
            }
        </Box>
    );
};

function renderCardList(pokemonList, scrollRef, isScrollLoading, onCardClick) {
    return (
        <Box
            display="flex"
            flexWrap="wrap"
            height='100%'
            marginLeft={'-8px'}
            marginTop={'8px'}
            overflow='auto'
            ref={scrollRef}
        >
            {
                pokemonList.map((pokemon, index) => (
                    <Box
                        key={index}
                        sx={{
                            width: '220px',
                            // height: '500px',
                            margin: '8px',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease, background-color 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.04)',
                            }
                        }}
                        onClick={() => {
                            onCardClick(pokemon)
                        }}
                    >
                        <PokemonCard pokemon={pokemon}></PokemonCard>
                    </Box>
                ))
            }
            { isScrollLoading ? <Loader/> : null }
        </Box>
    )
}

function EmptyMessage() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            textAlign="center"
        >
            <Typography
                variant="h6"
                color="textSecondary"
                bgcolor='rgb(0,0,0,0.3)'
                padding={'20px'}
                borderRadius='5px'
                sx={{ color: 'white' }}
            >
                No Pokémon found. Try adjusting your filters or search criteria.
            </Typography>
        </Box>
    );
}

export default PokemonList;