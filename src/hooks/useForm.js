import { useEffect, useMemo, useState } from "react";


export const useForm = ( initialForm = {}, formValidations = {} ) => {


  const [formState, setformState] = useState( initialForm );
  const [ formValidation, setFormValidation] = useState({});

  useEffect(() => { 
    createValidators();
  }, [formState])
  
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

  const createValidators = () => {

    const formCheckedValues = {};

    for (const formField of Object.keys( formValidations ) ) {

      const [ fn, errorMessage = 'errores de validacion' ] = formValidations[formField];
      formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;

      setFormValidation( formCheckedValues )
      
    }

  }


  const isFormValid = useMemo( () => {
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