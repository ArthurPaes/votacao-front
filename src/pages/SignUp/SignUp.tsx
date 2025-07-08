import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Card, Typography, Box, InputAdornment } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { userApi } from '../../api';
import { useSnackbar } from '../../hooks/useSnackbar';

export default function SignUp() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();
  const [newUserData, setNewUserData] = useState({ name: '', cpf: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const preventNonNumeric = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9.\-]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
      e.preventDefault();
    }
  };

  const handleCreateAccount = async () => {
    try {
      await userApi.createUser(newUserData);
      showSuccess('Conta criada com sucesso!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (error: any) {
      showError(error?.response?.data?.message || error?.message || 'Erro ao criar conta');
    }
  };

  return (
    <div className="login-container">
      <Card className="login-box">
        <Box className="login-icon-box">
          <PersonAddIcon className="login-icon" />
        </Box>
        <Typography variant="h5" align="center" className="login-title">Cadastre-se</Typography>
        <Typography variant="subtitle1" align="center" className="login-subtitle">
          Crie sua conta para participar das votações da sua associação.
        </Typography>
        <Box className="div-form-container">
          <TextField
            className="mat-form-field"
            label="Nome:"
            name="name"
            value={newUserData.name}
            onChange={handleChange}
            placeholder="João Silva"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon style={{ color: '#a0aec0' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className="mat-form-field"
            label="CPF:"
            name="cpf"
            value={newUserData.cpf}
            onChange={handleChange}
            onKeyDown={preventNonNumeric}
            placeholder="012.234.567-89"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon style={{ color: '#a0aec0' }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className="mat-form-field"
            label="E-mail:"
            name="email"
            value={newUserData.email}
            onChange={handleChange}
            placeholder="joaosilva@email.com"
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
            value={newUserData.password}
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
            disabled={
              newUserData.email.length <= 0 ||
              newUserData.password.length <= 0 ||
              newUserData.name.length <= 0 ||
              newUserData.cpf.length <= 0
            }
            onClick={handleCreateAccount}
            fullWidth
          >
            Criar
          </Button>
        </Box>
      </Card>
    </div>
  );
} 