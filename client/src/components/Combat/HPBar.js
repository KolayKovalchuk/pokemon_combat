import React from 'react';
import Box from '@mui/material/Box';

const HPBar = ({ value, max }) => {
    const hpPercentage = Math.max(0, Math.min((value / max) * 100, 100));

    return (
        <Box
            sx={{
                width: '100%', // Width of the HP bar
                height: '30px', // Height of the HP bar
                border: '1px solid #000', // Border of the HP bar
                borderRadius: '4px', // Rounded corners
                overflow: 'hidden', // Hide overflow
                position: 'relative',
                backgroundColor: '#ff9c9c', // Background color of the bar
                marginBottom: '8px'
            }}
        >
            <Box
                sx={{
                    width: `${hpPercentage}%`, // Width based on HP percentage
                    height: '100%', // Full height
                    backgroundColor: '#ed1c24', // Color representing HP
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
            />
        </Box>
    );
};

export default HPBar;
