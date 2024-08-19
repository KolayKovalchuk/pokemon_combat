import React, { useState, useEffect } from 'react';
import MetaMaskConnect from './components/MetaMaskConnect/MetaMaskConnect.js';
import { Box } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './components/Main.js';
import { AuthContextProvider } from './context/authContext.js';

const queryClient = new QueryClient();

const App = () => {
    const [token, setToken] = useState('');
    const [userAddress, setUserAddress] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('pokemon_combat_token');
        if (storedToken) {
            setToken(storedToken);
            const payload = jwtDecode(storedToken);

            if (!payload.address) return

            setUserAddress(payload.address)
        }
    }, [token]);

    const handleConnect = async (token) => {
        try {
            setToken(token);
            localStorage.setItem('pokemon_combat_token', token);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <Box className="App" sx={{ height: '100vh' }}>
                    {token ? (
                        <Main userAddress={userAddress}></Main>
                    ) : (
                        <MetaMaskConnect onConnect={handleConnect} />
                    )}
                </Box>
            </AuthContextProvider>
        </QueryClientProvider>
    );
};

export default App;