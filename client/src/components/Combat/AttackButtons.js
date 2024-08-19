import { Box, Button } from '@mui/material';

const AttackButtons = ({ pokemon, isPlayerMove, onAttack }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Button
                variant="contained"
                color="primary"
                disabled={!isPlayerMove}
                onClick={() => onAttack('normal')}
            >
                Normal Attack
            </Button>
            {
                pokemon.type.map((type, index) => {
                    return (
                        <Button
                            key={index}
                            variant="contained"
                            color="primary"
                            disabled={!isPlayerMove}
                            onClick={() => onAttack(type)}
                        >
                            {type} Attack
                        </Button>
                    )
                })
            }
        </Box>
    );
};

export default AttackButtons;