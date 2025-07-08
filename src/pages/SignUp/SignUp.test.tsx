import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SignUp from './SignUp';
import { userApi } from '../../api';
import { SnackbarProvider } from '../../hooks/useSnackbar';

vi.mock('../../api', () => ({
  userApi: { createUser: vi.fn() }
}));

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('SignUp Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders signup form', () => {
    render(
      <SnackbarProvider>
        <SignUp />
      </SnackbarProvider>
    );
    expect(screen.getByLabelText(/Nome:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CPF:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha:/i)).toBeInTheDocument();
  });

  it('disables create button if fields are empty', () => {
    render(
      <SnackbarProvider>
        <SignUp />
      </SnackbarProvider>
    );
    const button = screen.getByRole('button', { name: /Criar/i });
    expect(button).toBeDisabled();
  });

  it('calls createUser and navigates on success', async () => {
    (userApi.createUser as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({});
    render(
      <SnackbarProvider>
        <SignUp />
      </SnackbarProvider>
    );
    fireEvent.change(screen.getByLabelText(/Nome:/i), { target: { value: 'Test User', name: 'name' } });
    fireEvent.change(screen.getByLabelText(/CPF:/i), { target: { value: '123.456.789-00', name: 'cpf' } });
    fireEvent.change(screen.getByLabelText(/E-mail:/i), { target: { value: 'test@email.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/Senha:/i), { target: { value: 'password', name: 'password' } });
    const button = screen.getByRole('button', { name: /Criar/i });
    fireEvent.click(button);
    await waitFor(() => expect(userApi.createUser).toHaveBeenCalled());
  });
}); 