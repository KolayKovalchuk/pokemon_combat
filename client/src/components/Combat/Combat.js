import React, { useEffect, useState } from 'react';
import { Box, Button, CardMedia } from '@mui/material';
import PokemonCard from '../PokemonList/PokemonCard.js';
import Loader from '../shared/Loader.js';
import HPBar from './HPBar.js';
import AttackButtons from './AttackButtons.js';
import useLoadOpponent from './useLoadOpponent.js';
import useCombatSocket from './useCombatSocket.js';
import CombatLogs from './LogList.js';

function Combat({ selectedPokemon, onCombatCanceled }) {
    const { opponent, isLoading } = useLoadOpponent(selectedPokemon._id)

    const [playerHP, setPlayerHP] = useState(selectedPokemon.base.hp)
    const [opponentHP, setOpponentHP] = useState(opponent?.base.hp || null)

    useEffect(() => {
        setOpponentHP(opponent?.base.hp)
    }, [opponent])

    const {
        combat,
        startCombat,
        emitAttack,
        resign,
    } = useCombatSocket(selectedPokemon, opponent)

    useEffect(() => {
        startCombat()
    }, [startCombat])

    return (<>
        {
            isLoading || !combat
                ? <Loader />
                :
                <Box sx={{
                    height: 'calc(100vh - 90px)'
                }}>
                    <Box sx={{
                        width: '100px',
                        margin: 'auto'
                    }}>
                        <CardMedia
                            component="img"
                            image='/images/vs.png'
                            alt='vs'
                        />
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'stretch',
                    }}>
                        <Box>
                            <HPBar value={combat.playerHP} max={selectedPokemon.base.hp}></HPBar>
                            <PokemonCard pokemon={selectedPokemon}></PokemonCard>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginTop: '8px'
                            }}>
                                <AttackButtons
                                    pokemon={selectedPokemon}
                                    isPlayerMove={combat.isPlayerMove}
                                    onAttack={(type) => emitAttack(type, combat._id)}
                                ></AttackButtons>
                                <Button
                                    sx={{
                                        marginTop: '8px',
                                        backgroundColor: '#8c8c8c',
                                        '&:hover': {
                                            backgroundColor: '#737373',
                                        }
                                    }}
                                    variant="contained" onClick={onCombatCanceled}>
                                    {combat.isFinished ? 'Back to menu' : 'Resign'}
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{
                            marginTop: '40px'
                        }}>
                            <CombatLogs logList={combat?.logList}></CombatLogs>
                        </Box>

                        <Box>
                            <HPBar value={combat.opponentHP} max={opponent.base.hp}></HPBar>
                            <PokemonCard pokemon={opponent}></PokemonCard>
                        </Box>
                    </Box>
                </Box>
        }
    </>
    );
};

export default Combat;
