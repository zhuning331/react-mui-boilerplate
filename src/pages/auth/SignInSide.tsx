import React, { useState, useContext, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { AxiosResponse } from 'axios';

import ISignInState, { initialSignInState } from '../../types/SignInState';
import { AuthContext, IAuthContext } from '../../types/AuthState';
import { AlertContext, IAlertContext } from '../../types/AlertState';
import AuthService from '../../services/AuthService';

const SignInSide: React.FC = () => {
  const [signInState, setSignInState] = useState<ISignInState>(initialSignInState);
  const { username, password, rememberMe } = signInState;
  const { authState, setAuthState } = useContext<IAuthContext>(AuthContext); 
  const { setAlertState } = useContext<IAlertContext>(AlertContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => navigate('/'), [navigate]);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name } = evt.target;
    const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
    setSignInState({ ...signInState, [name]: value });
  };

  const handleLogin = () => {
    AuthService
      .login(username, password, rememberMe)
      .then(() => {
        setAuthState({ ...authState, isAuthenticated: true });
      }, (res: AxiosResponse) => {
        console.error(res);
        setAlertState({
          open: true,
          severity: 'error',
          message: t('global.message.loginFail')
        });
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} sx={{
        backgroundImage: 'url(/images/img_login_bg.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('global.auth.login')}
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label={t('global.auth.username')}
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('global.auth.password')}
              type="password"
              id="password"
              autoComplete="password"
              value={password}
              onChange={handleInputChange}
            />
            <FormControlLabel
              name="rememberMe"
              control={
                <Checkbox 
                  name="rememberMe"
                  checked={rememberMe} 
                  onChange={handleInputChange} 
                  color="primary" 
                />}
              label={<Trans i18nKey={'global.auth.rememberMe'} />}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              {t('global.auth.login')}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t('global.auth.forgotPassword')}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {t('global.auth.signUpInfo')}
                </Link>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
              {'Copyright © Awesome Company ' + new Date().getFullYear() + '.'}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignInSide;