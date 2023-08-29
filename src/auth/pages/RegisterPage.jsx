import { useMemo, useState } from "react"
import { Link as RouterLink} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { ArrowCircleRightOutlined } from "@mui/icons-material"
import { useForm } from "../../hooks"
import { startCreatingUserWithEmailPassword } from "../../store/auth"

const formData = {
  email: '',
  password: '',
  displayName: ''
}

//con formValidation lo que hago es crear un objeto que le paso como segundo argumento al useForm, mi customHook, donde declaro las validaciones para que se cumplan los requisitos del formulario. Si solamente una no se cumple, el formulario NO sera valido.
const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6, 'El password debe de tener mas de 6 caracteres'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  const {status, errorMessage} = useSelector( state => state.auth)

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false)

  const isCheckingAuthentication = useMemo( () => status === 'checking', [status])

  const { 
    displayName, email, password, onInputChange, formState, isFormValid, emailValid, passwordValid, displayNameValid 
  } = useForm( formData, formValidations );


  const onSubmit = (event) => {
    event.preventDefault();

    setFormSubmitted( true )

    if( !isFormValid ) return

    dispatch( startCreatingUserWithEmailPassword(formState) )

  }

  return (
    <>
      <AuthLayout title='Register'>

        <form className="animate__animated animate__fadeIn animate__faster" onSubmit={ onSubmit } >

          <Grid container>

            <Grid item xs={ 12 }  sx={{ mt: 2 }}>

              <TextField 
              label='Nombre Completo' 
              type='text' 
              name= 'displayName'
              value={ displayName }
              onChange={ onInputChange }
              placeholder="Ingrese su nombre completo" 
              fullWidth
              error={ !!displayNameValid && formSubmitted } 
              helperText={displayNameValid}
              />

            </Grid>

            <Grid item  xs={ 12 }  sx={{ mt: 2 }}>

              <TextField 
              label='Email' 
              type='email' 
              name= 'email'
              value={ email }
              onChange={ onInputChange }
              placeholder="Ingrese su email" 
              fullWidth
              error={ !!emailValid && formSubmitted }
              helperText={ emailValid }
              />

            </Grid>

            <Grid item  xs={ 12 }  sx={{ mt: 2 }}>

              <TextField 
              label='Password' 
              type='password' 
              name= 'password'
              value={ password }
              onChange={ onInputChange }
              placeholder="Ingrese su password" 
              fullWidth
              error={ !!passwordValid && formSubmitted }
              helperText={ passwordValid }
              />

            </Grid>

            <Grid container spacing={ 2 } sx={{ mt: 1, mb: 2 }}>

              <Grid 
                item 
                xs={12}
                display={ !!errorMessage ? '' : 'none' }
              >
                <Alert severity="error">
                  {errorMessage}
                </Alert>
              </Grid>

              <Grid item xs={ 12 } md={ 6 } >

                <Button 
                disabled={ isCheckingAuthentication }
                type="submit"
                variant="contained" 
                fullWidth><ArrowCircleRightOutlined 
                sx={{ mr: 1 }}
                />
                Crear Cuenta
                </Button>

              </Grid>

            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } to='/auth/login' sx={{ color: 'inherit', textDecoration:'none', cursor: 'pointer'}}>
                Ingresar
              </Link>

            </Grid>

          </Grid>

        </form>

      </AuthLayout>     


    </>
  )
}
