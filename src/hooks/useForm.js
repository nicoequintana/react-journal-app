import { useEffect, useMemo, useState } from "react";


export const useForm = ( initialForm = {}, formValidations = {} ) => {


  const [formState, setformState] = useState( initialForm );
  const [ formValidation, setFormValidation] = useState({});

  useEffect(() => { //cada vez que cambie el estado del formulario, voy a disparar createValidator par avalidar los datos recibidos.
    createValidators();
  }, [formState])
  
  //el initial form inicia con los valores que le estoy mandando en este caso, desde noteview, la nota activa. Entonces, lo que tengo que hacer con este useEffect, es que cada vez que cambie el estado inicial del formulario, lo setee en el formState. Asi, cada vez que haga click en una nota dentro de sideBarItem, voy a estar viendo la noteView con esa informacion
  useEffect(() => { 
    setformState(initialForm)
  }, [initialForm])

  const onInputChange = ({ target }) => {

    const {name, value} = target;
    
    setformState({
      ...formState,
      [ name ]: value,
    })

  }

  const resetForm = () => {
    setformState( initialForm )
  }

  //logica para validar los campos que recibo del formulario de registro, componente registerPage.jsx
  //esta funcion de createValidators va a tomar el objeto que recibo de formValidation, y va a evaluar si son validas o no, o si se cumplieron o no las validaciones que hice en el componente de registro. Luego va a guardar todo en el estado del custom hook para poder evaluarlo.
  //esta funcion se va a disparar mediante un useEffect (mas arriba, debajo del useState de formValidation)
  const createValidators = () => {

    const formCheckedValues = {};

    for (const formField of Object.keys( formValidations ) ) {

      //console.log(formField)
      //ahora puedo desestructurar la funcion y el mensaje de error que vienen del formValidation basado en el formField. O sea, de cada formfield(displayname, password, email, lo que sea, yo voy a desestructurar eso y voy a tomar la funcion (fn) y el mensaje de error)
      const [ fn, errorMessage = 'errores de validacion' ] = formValidations[formField];
      //console.log([fn, errorMessage])
      //con el templatestring de abajo, voy a estar creando lo que desestructuro en el componente de register.jsx (passwordValid, emailValid y displayNameValid.)
      formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;

      setFormValidation( formCheckedValues )
      //console.log(formCheckedValues)
      
    }

  }


  //aca lo que hago es, con un useMemo() memorizo los valores que tiene el formValidation (estado del useForm()). 
  const isFormValid = useMemo( () => {
    //con un for of, lo que hago es evaluar el formValue de cada uno de las propiedades del formValidation y preguntar,     si formValue del formValidation es estrictamente distinto de NULL (o sea que hay error) entonces returna false,     sino, returna true. Esta constante la retorno de este custom hook para recibirla en registerPage.jsx
    for (const formValue of Object.keys(formValidation)) {
      
      if( formValidation[formValue] !== null ) return false;
    }

    return true

  }, [ formValidation ] )


  return {
    ...formState,
    formState,
    onInputChange,
    resetForm,

    ...formValidation,
    isFormValid,

  }
}