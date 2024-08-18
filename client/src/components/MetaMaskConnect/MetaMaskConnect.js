import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import { getNonce, connectMetaMask } from '../../api/authService.js';
import { Box, CardMedia } from '@mui/material';
import MetaMaskNotDetected from './MetaMaskNotDetected.js';

function MetaMaskConnect({ onConnect }) {
    const [address, setAddress] = useState('');
    const [nonce, setNonce] = useState('');

    useEffect(() => {
        const fetchNonce = async () => {
            try {
                const { nonce } = await getNonce();
                console.log('nonce', nonce)
                setNonce(nonce);
            } catch (error) {
                console.error('Error fetching nonce:', error);
            }
        };

        fetchNonce();
    }, []);

    const connectMetaMaskBtn = async () => {
        if (window.ethereum) {
            try {
                const { token, userAddress } = await connectMetaMask(nonce)

                console.log('before onConnect')
                onConnect(token);
                setAddress(userAddress);
            } catch (error) {
                console.error('Error connecting to MetaMask:', error);
            }
        } else {
            console.error('MetaMask not detected or nonce not available');
        }
    };

    if (!window.ethereum) {
        return (<MetaMaskNotDetected></MetaMaskNotDetected>)
    }

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'translateY(-25%)'
            }}>
                <CardMedia
                    component="img"
                    image='images/metamask/logo.png'
                    alt="Metamask"
                    sx={{
                        width: '350px'
                    }}
                />
                <Button
                    variant="contained"
                    onClick={connectMetaMaskBtn}
                    sx={{
                        backgroundColor: '#F6851B',  // MetaMask orange
                        color: '#FFFFFF',  // White text color
                        '&:hover': {
                            backgroundColor: '#E4761B',  // Darker orange on hover
                        },
                    }}
                >Connect MetaMask</Button>
                {address && <p>Connected as: {address}</p>}
            </Box>
        </Box>
    );
};

export default MetaMaskConnect;
