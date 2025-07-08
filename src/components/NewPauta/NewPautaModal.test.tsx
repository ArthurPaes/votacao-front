import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import NewPautaModal from './NewPautaModal';

describe('NewPautaModal', () => {
  it('renders modal when open', () => {
    render(<NewPautaModal open={true} onClose={() => {}} />);
    expect(screen.getByText(/Criar uma nova pauta/i)).toBeInTheDocument();
  });

  it('calls onClose with null when dialog is closed', () => {
    const onClose = vi.fn();
    render(<NewPautaModal open={true} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    // Simulate dialog close by clicking backdrop or similar
    // (Dialog's onClose is called with null)
    // This is a placeholder; actual implementation may need to find the backdrop
  });

  it('disables button if fields are empty', () => {
    render(<NewPautaModal open={true} onClose={() => {}} />);
    const button = screen.getByRole('button', { name: /Criar pauta/i });
    expect(button).toBeDisabled();
  });

  it('enables button when all fields are filled and calls onClose with data', () => {
    const onClose = vi.fn();
    render(<NewPautaModal open={true} onClose={onClose} />);
    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'Test Pauta', name: 'name' } });
    fireEvent.change(screen.getByLabelText(/Descrição:/i), { target: { value: 'Descrição', name: 'description' } });
    fireEvent.change(screen.getByLabelText(/Duração \(minutos\):/i), { target: { value: '10', name: 'expiration' } });
    const button = screen.getByRole('button', { name: /Criar pauta/i });
    expect(button).not.toBeDisabled();
    fireEvent.click(button);
    expect(onClose).toHaveBeenCalledWith({ name: 'Test Pauta', description: 'Descrição', expiration: '10' });
  });
}); 