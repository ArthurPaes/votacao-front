import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from './Login';
import { authApi } from '../../api';
import { SnackbarProvider } from '../../hooks/useSnackbar';

vi.mock('../../api', () => ({
  authApi: { authenticateUser: vi.fn() }
}));

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Login Page', () => {
  it('renders login form', () => {
    render(
      <SnackbarProvider>
        <Login />
      </SnackbarProvider>
    );
    expect(screen.getByLabelText(/E-mail:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha:/i)).toBeInTheDocument();
  });

  it('disables login button if fields are empty', () => {
    render(
      <SnackbarProvider>
        <Login />
      </SnackbarProvider>
    );
    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(button).toBeDisabled();
  });

  it('calls authenticateUser and navigates on success', async () => {
    (authApi.authenticateUser as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({});
    render(
      <SnackbarProvider>
        <Login />
      </SnackbarProvider>
    );
    fireEvent.change(screen.getByLabelText(/E-mail:/i), { target: { value: 'test@email.com', name: 'email' } });
    fireEvent.change(screen.getByLabelText(/Senha:/i), { target: { value: 'password', name: 'password' } });
    const button = screen.getByRole('button', { name: /Entrar/i });
    fireEvent.click(button);
    await waitFor(() => expect(authApi.authenticateUser).toHaveBeenCalled());
  });
}); 