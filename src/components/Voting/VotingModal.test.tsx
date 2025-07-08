import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import VotingModal from './VotingModal';

describe('VotingModal', () => {
  const pauta = { name: 'Pauta 1', description: 'Descrição da pauta' };

  it('renders modal with pauta info', () => {
    render(<VotingModal open={true} pauta={pauta} onClose={() => {}} />);
    expect(screen.getByText(/Pauta: Pauta 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Descrição da pauta/i)).toBeInTheDocument();
  });

  it('disables vote button until an answer is selected', () => {
    render(<VotingModal open={true} pauta={pauta} onClose={() => {}} />);
    const button = screen.getByRole('button', { name: /VOTAR/i });
    expect(button).toBeDisabled();
  });

  it('enables vote button after selecting an answer and calls onClose', () => {
    const onClose = vi.fn();
    render(<VotingModal open={true} pauta={pauta} onClose={onClose} />);
    fireEvent.click(screen.getByText('SIM'));
    const button = screen.getByRole('button', { name: /VOTAR/i });
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalledWith(true);
  });

  it('calls onClose with false when "NÃO" is selected and voted', () => {
    const onClose = vi.fn();
    render(<VotingModal open={true} pauta={pauta} onClose={onClose} />);
    fireEvent.click(screen.getByText('NÃO'));
    const button = screen.getByRole('button', { name: /VOTAR/i });
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalledWith(false);
  });
}); 