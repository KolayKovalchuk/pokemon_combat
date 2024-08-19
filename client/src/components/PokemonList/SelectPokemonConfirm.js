import React, { useCallback, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PokemonCard from './PokemonCard.js';
import { Box } from '@mui/material';

const SelectPokemonConfirm = ({ open, onClose, onConfirm, pokemon }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Selection</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to select {pokemon?.name.english}?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <PokemonCard pokemon={pokemon}></PokemonCard>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export function useConfirmPokemonDialog() {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [confirmedPokemon, setConfirmedPokemon] = useState(null);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handlePokemonClick = useCallback((pokemon) => {
        setSelectedPokemon(pokemon);
        setDialogOpen(true);
    }, []);

    const handleConfirm = useCallback(() => {
        setDialogOpen(false);
        setConfirmedPokemon(selectedPokemon);
    }, [selectedPokemon]);

    const handleClose = useCallback(() => {
        setDialogOpen(false);
    }, []);

    return {
        selectedPokemon,
        confirmedPokemon,
        setConfirmedPokemon,
        isDialogOpen,
        handlePokemonClick,
        handleConfirm,
        handleClose,
    }
}

export default SelectPokemonConfirm;
