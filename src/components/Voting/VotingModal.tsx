import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip, Typography } from '@mui/material';
import './VotingModal.css';

interface VotingModalProps {
  open: boolean;
  pauta: { name: string; description: string };
  onClose: (vote: boolean | undefined) => void;
}

export default function VotingModal({ open, pauta, onClose }: VotingModalProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | undefined>(undefined);

  const handleYes = () => setSelectedAnswer(true);
  const handleNo = () => setSelectedAnswer(false);
  const handleVote = () => onClose(selectedAnswer);

  return (
    <Dialog open={open} onClose={() => onClose(undefined)}>
      <DialogTitle>Pauta: {pauta.name}</DialogTitle>
      <DialogContent>
        <Typography>{pauta.description}</Typography>
        <div className="mat-dialog-actions">
          <Typography>Você é a favor desta pauta?</Typography>
          <div className="chips-container">
            <Chip
              label="SIM"
              className="chip"
              onClick={handleYes}
              style={{ backgroundColor: selectedAnswer === true ? 'rgb(32, 158, 32)' : 'rgb(203, 228, 203)' }}
            />
            <Chip
              label="NÃO"
              className="chip"
              onClick={handleNo}
              style={{ backgroundColor: selectedAnswer === false ? 'rgb(255, 183, 183)' : 'rgb(217, 76, 76)' }}
            />
          </div>
          <Button
            variant="contained"
            className="create-section-button"
            disabled={selectedAnswer === undefined}
            onClick={handleVote}
          >
            VOTAR
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 