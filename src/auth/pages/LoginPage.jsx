import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useMemo } from 'react';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';
import { Alert, Button, Grid,Link,TextField,Typography } from "@mui/material";
import { ArrowCircleUp, Google } from "@mui/icons-material";


const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {


  const { status, errorMessage } = useSelector( state => state.auth)

  const dispatch = useDispatch()

  const isAuthenticating = useMemo( () => status === 'checking', [status] )

  const { email, password, onInputChange, formState } = useForm(formData);

  // console.log({ email, password });

  const onSubmit = ( e ) => {
    e.preventDefault();

    dispatch( startLoginWithEmailPassword({ email, password }) )
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn')

    dispatch ( startGoogleSignIn() );
  }

  return (
    <>
      <AuthLayout title='Login'>

        <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">

          <Grid container>

            <Grid item xs={ 12 }  sx={{ mt: 2 }}>
              <TextField 
                label='Email' 
                type='email' 
                placeholder="ejemplo@email.com" 
                fullWidth
                name='email'
                value= { email }
                onChange={ onInputChange }
                />
            </Grid>

            <Grid item  xs={ 12 }  sx={{ mt: 2 }}>
              <TextField 
                label='Password' 
                type='text' 
                placeholder="Ingrese su password" 
                fullWidth
                name='password'
                value= { password }
                onChange={ onInputChange }
                />
            </Grid>

            <Grid 
            container
            display={ !!errorMessage ? '' : 'none' }
            sx={{marginTop: '15px'}}
            >
              <Grid 
                 item 
                 xs={12}
               >
                 <Alert severity="error">
                   {errorMessage}
                 </Alert>
               </Grid>
            </Grid>

            <Grid container 
              spacing={ 2 } 
              sx={{ mt: 1, mb: 2 }}>

              <Grid item 
                xs={ 12 } 
                md={ 6 }>
                <Button 
                  disabled= { isAuthenticating }
                  variant="contained" 
                  fullWidth
                  type='submit'>
                <ArrowCircleUp 
                  sx={{ mr: 1 }} />
                Login
                </Button>
              </Grid>

              <Grid item xs={ 12 } md={ 6 } >
                <Button 
                disabled= { isAuthenticating }
                variant="contained" 
                fullWidth
                onClick={ onGoogleSignIn }>
                  <Google />
                  <Typography 
                    sx={{ ml: 1, textTransform: 'capitalize'}}>
                  Google
                  </Typography>
                </Button>
              </Grid>

            </Grid>

            <Grid container 
            direction='row' 
            justifyContent='end'>
              <Link 
                component={ RouterLink } 
                to='/auth/register' 
                sx={{ 
                  color: 'inherit', 
                  textDecoration:'none', 
                  cursor: 'pointer', 
                  padding: 1, 
                  border: 1, 
                  borderRadius: 1  }}>
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>

        </form>

      </AuthLayout>     
    </>
      
  )
}
