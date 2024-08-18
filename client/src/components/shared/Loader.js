import { Box, CircularProgress } from '@mui/material';

function Loader({ size = 100 }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%' // Adjust the height as needed
            }}
        >
            <CircularProgress size={size} />
        </Box>
    );
};

export default Loader