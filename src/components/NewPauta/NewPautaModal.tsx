import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import './NewPautaModal.css';

interface NewPautaModalProps {
  open: boolean;
  onClose: (newPauta: { name: string; description: string; expiration: number } | null) => void;
}

export default function NewPautaModal({ open, onClose }: NewPautaModalProps) {
  const [newPauta, setNewPauta] = useState({ name: '', description: '', expiration: 1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPauta({ ...newPauta, [e.target.name]: e.target.value });
  };

  const preventNonNumeric = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  const handleCreate = () => {
    onClose(newPauta);
    setNewPauta({ name: '', description: '', expiration: 1 });
  };

  return (
    <Dialog open={open} onClose={() => onClose(null)}>
      <Box className="direction-column-center">
        <DialogTitle>Criar uma nova pauta</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome:"
            name="name"
            value={newPauta.name}
            onChange={handleChange}
            placeholder="Nova pauta"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Descrição:"
            name="description"
            value={newPauta.description}
            onChange={handleChange}
            multiline
            minRows={2}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Duração (minutos):"
            name="expiration"
            value={newPauta.expiration}
            onChange={handleChange}
            onKeyDown={preventNonNumeric}
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions className="direction-column-center">
          <Button
            variant="contained"
            className="create-pauta-button"
            disabled={
              newPauta.name.length <= 0 ||
              newPauta.description.length <= 0 ||
              Number(newPauta.expiration) <= 0
            }
            onClick={handleCreate}
          >
            Criar pauta
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
} 