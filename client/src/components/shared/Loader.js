import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const SpinningImage = styled('img')({
    width: 200,
    height: 200,
    animation: 'spin 2s linear infinite',
    '@keyframes spin': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
});

function getRandomNumberFormatted() {
    const randomNumber = Math.floor(Math.random() * 898) + 1;

    const formattedNumber = randomNumber.toString().padStart(3, '0');

    return formattedNumber;
};

function Loader({ imageSrc = '', altText = 'Loading...' }) {
    const [ src, setSrc ] = useState(imageSrc)

    useEffect(() => {
        if (!imageSrc) {
            setSrc(`/images/pokedex/hires/${getRandomNumberFormatted()}.png`)
        }
    }, [imageSrc])
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <SpinningImage src={src} alt={imageSrc} />
        </Box>
    );
};

export default Loader;
