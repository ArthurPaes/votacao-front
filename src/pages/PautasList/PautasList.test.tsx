import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PautasList from './PautasList';
import { sectionApi, voteApi } from '../../api';

vi.mock('../../api', () => ({
  sectionApi: {
    getAllSections: vi.fn(),
    createSection: vi.fn(),
  },
  voteApi: {
    voteOnSection: vi.fn(),
  },
}));

vi.mock('../../hooks/useSnackbar', () => ({
  useSnackbar: () => ({
    showSuccess: vi.fn(),
    showError: vi.fn(),
  }),
}));

describe('PautasList', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('renders open and closed pautas', async () => {
    (sectionApi.getAllSections as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      { id: 1, name: 'Open Pauta', description: 'desc', expiration: 10, hasVoted: false, totalVotes: 0, votesTrue: 0, votesFalse: 0, isExpired: false },
      { id: 2, name: 'Closed Pauta', description: 'desc', expiration: 10, hasVoted: true, totalVotes: 2, votesTrue: 1, votesFalse: 1, isExpired: true },
    ]);
    localStorage.setItem('@UserData', JSON.stringify({ id: 1, name: 'User', email: 'user@email.com', cpf: '123' }));
    render(<PautasList />);
    expect(await screen.findByText(/Pauta: Open Pauta/i)).toBeInTheDocument();
    expect(await screen.findByText(/Pauta: Closed Pauta/i)).toBeInTheDocument();
  });

  it('opens new pauta modal and calls createSection', async () => {
    (sectionApi.getAllSections as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    (sectionApi.createSection as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({});
    localStorage.setItem('@UserData', JSON.stringify({ id: 1, name: 'User', email: 'user@email.com', cpf: '123' }));
    render(<PautasList />);
    fireEvent.click(await screen.findByRole('button', { name: /Criar uma nova pauta/i }));
    // Fill modal fields
    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'Nova Pauta', name: 'name' } });
    fireEvent.change(screen.getByLabelText(/Descrição:/i), { target: { value: 'Descrição', name: 'description' } });
    fireEvent.change(screen.getByLabelText(/Duração \(minutos\):/i), { target: { value: '10', name: 'expiration' } });
    fireEvent.click(screen.getByRole('button', { name: /Criar pauta/i }));
    await waitFor(() => expect(sectionApi.createSection).toHaveBeenCalled());
  });

  it('opens voting modal and calls voteOnSection', async () => {
    (sectionApi.getAllSections as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([
      { id: 1, name: 'Open Pauta', description: 'desc', expiration: 10, hasVoted: false, totalVotes: 0, votesTrue: 0, votesFalse: 0, isExpired: false },
    ]);
    (voteApi.voteOnSection as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({});
    localStorage.setItem('@UserData', JSON.stringify({ id: 1, name: 'User', email: 'user@email.com', cpf: '123' }));
    render(<PautasList />);
    fireEvent.click(await screen.findByRole('button', { name: /Votar/i }));
    fireEvent.click(screen.getByText('SIM'));
    fireEvent.click(screen.getByRole('button', { name: /VOTAR/i }));
    await waitFor(() => expect(voteApi.voteOnSection).toHaveBeenCalled());
  });
}); 