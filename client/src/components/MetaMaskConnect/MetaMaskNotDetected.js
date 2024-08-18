import React from 'react';
import { Box, Button, Alert, AlertTitle } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

function MetaMaskNotDetected() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                backgroundColor: '#f5f5f5',
                padding: 2,
                textAlign: 'center'
            }}
        >
            <Alert
                severity="warning"
                icon={<WarningIcon fontSize="large" />}
                sx={{
                    backgroundColor: '#FFF3CD',
                    borderColor: '#FFEEBA',
                    color: '#856404',
                    maxWidth: 500,
                    height: 'auto'
                }}
            >
                <AlertTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    MetaMask Not Detected
                </AlertTitle>
                <AlertTitle>It looks like MetaMask is not installed. Please install MetaMask and reload to use this application.</AlertTitle>
            </Alert>

            <Button
                variant="contained"
                href="https://metamask.io/download.html"
                target="_blank"
                sx={{
                    marginTop: 2,
                    backgroundColor: '#F6851B',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#E4761B',
                    },
                    padding: '10px 20px',
                    borderRadius: '8px',
                }}
            >
                Install MetaMask
            </Button>
        </Box>
    );
};

export default MetaMaskNotDetected;
