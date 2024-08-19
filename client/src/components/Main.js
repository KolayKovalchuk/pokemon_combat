import React, { useContext, useEffect } from 'react';
import PokemonList from './PokemonList/PokemonList.js';
import { Typography, Box } from '@mui/material';
import Combat from './Combat/Combat.js';
import SelectPokemonConfirm, { useConfirmPokemonDialog } from './PokemonList/SelectPokemonConfirm.js';
import { AuthContext } from '../context/authContext.js';

function Main({ userAddress }) {
    const {
        selectedPokemon,
        confirmedPokemon,
        setConfirmedPokemon,
        isDialogOpen,
        handlePokemonClick,
        handleConfirm,
        handleClose,
    } = useConfirmPokemonDialog()
    const { setUserAddress } = useContext(AuthContext);

    useEffect(() => {
        setUserAddress(userAddress)
    }, [userAddress, setUserAddress])

    return (
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

            {
                !!confirmedPokemon
                    ? <Combat selectedPokemon={confirmedPokemon} onCombatCanceled={() => setConfirmedPokemon(null)}></Combat>
                    : <>
                        <Box display="flex" marginBottom={'8px'}>
                            <Typography variant="h8">
                                Please, choose pokemon from cards below:
                            </Typography>
                        </Box>
                        <PokemonList onCardClick={handlePokemonClick} />
                    </>
            }

            <SelectPokemonConfirm
                open={isDialogOpen}
                onClose={handleClose}
                onConfirm={handleConfirm}
                pokemon={selectedPokemon}
            />
        </Box>
    );
};

export default Main;