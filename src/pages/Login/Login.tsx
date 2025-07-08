import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, Typography, Box, InputAdornment, Divider } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { authApi } from '../../api';
import './Login.css';
import { useSnackbar } from '../../hooks/useSnackbar';

const Alert = React.forwardRef<HTMLDivElement, any>(function Alert(props, ref) {
  return null;
});

export default function Login() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();
  const [login, setLogin] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      await authApi.authenticateUser(login);
      showSuccess('Login efetuado com sucesso');
      setTimeout(() => navigate('/pautas'), 1000);
    } catch (error: any) {
      showError(error?.message || 'Erro ao logar');
    }
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="login-container">
      <Card className="login-box">
        <Box className="login-icon-box">
          <LoginIcon className="login-icon" />
        </Box>
        <Typography variant="h5" align="center" className="login-title">Bem vindo, associado</Typography>
        <Typography variant="subtitle1" align="center" className="login-subtitle">
          Entre para acessar sua conta e votar nas pautas da sua associação.
        </Typography>
        <Box className="div-form-container">
          <TextField
            className="mat-form-field"
            label="E-mail:"
            name="email"
            value={login.email}
            onChange={handleChange}
            placeholder="example@email.com"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon style={{ color: '#a0aec0' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className="mat-form-field"
            label="Senha:"
            name="password"
            type="password"
            value={login.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon style={{ color: '#a0aec0' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className="buttons-container">
          <Button
            variant="contained"
            color="primary"
            className="login-main-btn"
            disabled={login.password.length <= 0 || login.email.length <= 0}
            onClick={handleLogin}
            fullWidth
          >
            Entrar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSignUp}
            fullWidth
          >
            Cadastrar
          </Button>
        </Box>
      </Card>
    </div>
  );
} 