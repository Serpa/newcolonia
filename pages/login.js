import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack';
import { CircularProgress } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://nupsi.uemgfrutal.com.br/">
        NUPSI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {

  const [loginError, setLoginError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const errorMsg = (msg) => {
    enqueueSnackbar(msg, {
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'center'
      },
      variant: 'error'
    })
  };
  const router = useRouter()

  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    setLoading(true);
    signIn("credentials", {
      usuario: data.usuario,
      senha: data.senha,
      callbackUrl: '/',
      redirect: false
    }).then(result => {
      if (result.error !== null) {
        if (result.status === 401) {
          errorMsg("Sua combinação de nome de usuário/senha esta incorreta. Por favor, tente novamente");
          setLoginError(true)
          setLoading(false);
          setTimeout(() => {
            setLoginError(false)
          }, 3000);
        } else {
          errorMsg(result.error);
          setLoginError(true)
          setLoading(false);
          setTimeout(() => {
            setLoginError(false)
          }, 3000);
        }
      } else {
        router.push(result.url);
      }
    })


  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              error={loginError}
              id="usuario"
              label="Usuário"
              name="usuario"
              autoComplete="usuario"
              autoFocus
              {...register("usuario")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              error={loginError}
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="current-password"
              {...register("senha")}
            />
            {loading ? (<div style={{ display:"flex", justifyContent:"center", alignItems:"center" }}> <CircularProgress /></div>) : (<Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>)}

          </Box>

        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}