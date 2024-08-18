import React, { useState, useEffect } from 'react';
import MetaMaskConnect from './components/MetaMaskConnect/MetaMaskConnect.js';
import PokemonList from './components/PokemonList/PokemonList.js';
import { Typography, Box } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('pokemon_combat_token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

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
            <Box className="App" sx={{ height: '100vh' }}>
                {token ? (
                    <Box padding='8px' sx={{
                        backgroundImage: 'url(/images/main_background.png)',
                        backgroundSize: 'cover',
                    }}>
                        <Box
                            display="flex"
                            alignItems="center"
                            flexDirection='column'
                            // bgcolor='rgb(0, 0, 0, 0.3)'
                        >
                            <Typography variant="h4">
                                Welcome to Pokemon Combat game!!!
                            </Typography>
                            <Typography variant="h6">
                                Let's see which one’s the best!
                            </Typography>
                        </Box>

                        <Box display="flex" marginBottom={'8px'}>
                            <Typography variant="h8">
                                Please, choose pokemon from cards below:
                            </Typography>
                        </Box>
                        <PokemonList />
                    </Box>
                ) : (
                    <MetaMaskConnect onConnect={handleConnect} />
                )}
            </Box>
        </QueryClientProvider>
    );
};

export default App;