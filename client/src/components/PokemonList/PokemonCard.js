import React from 'react';
import { Box, Grow, Card, CardHeader, CardContent, Typography, CardMedia } from '@mui/material';
import RadarChart from '../shared/RadarChart.js';

function getLabels(data) {
    const labels = ['HP', 'At', 'SAt', 'S', 'SDf', 'Df'];
    return labels.map((label, index) => {
        return `${label}:${data[index]}`
    })
}


function getTooltipLabel(tooltipItems) {
    const fullLabels = ['HP', 'Attack', 'Special Attack', 'Speed', 'Special Defense', 'Defense'];
    const index = tooltipItems.dataIndex;
    return `${fullLabels[index]}:${tooltipItems.raw}`;
}

function PokemonCard({ pokemon }) {
    const data = [
        pokemon.base.hp,
        pokemon.base.attack,
        pokemon.base.spAttack,
        pokemon.base.speed,
        pokemon.base.spDefense,
        pokemon.base.defense,
    ];
    const labels = getLabels(data)
    
    return (
        <Grow in={true}>
            <Card sx={{ maxWidth: 220, minWidth: 170, maxHeight: 500 }}>
                <CardContent>
                    <CardHeader title={pokemon.name.english} sx={{ padding: '0' }}></CardHeader>

                    <Box>
                        <Typography variant="subtitle1" color="text.secondary">
                            Pokemon Types:
                        </Typography>
                        <Typography variant="body2">
                            {pokemon.type.join(', ')}
                        </Typography>
                    </Box>

                    <Box marginBottom={'8px'}>
                        <CardMedia
                            component="img"
                            image={pokemon.image.hires}  // URL for the Pokémon image
                            alt={pokemon.name.english}
                        />
                    </Box>

                    <RadarChart data={data} labels={labels} getTooltipLabel={getTooltipLabel}/>
                </CardContent>
            </Card>
        </Grow>
    );
};

export default PokemonCard;
