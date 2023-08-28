import { signInWithGoogle, registerUserLocal, loginWithEmailPassword, logoutFireBase } from "../../firebase/providers";
import { fileUpload } from "../../helpers/fileUpload";
import { clearNoteLogout, setPhotosToActiveNote, setSaving } from "../journal";
import { checkingCredentials, login, logout } from "./";
//son acciones que yo puedo hacer dispatch pero que tienen una tarea asincrona.

//este thunk lo voy a usar para validar las credenciales del usuario cuando ya tiene un usuario registrado. Es decir, voy a preguntarle al backend si el usuario existe, en ese mientras tanto, paso el status del provider a checking
export const checkingAuthentication = ( email, password ) => {

    return async( dispatch ) => {


        dispatch( checkingCredentials() )

    }

}

//este thunk lo utilizo con firebase para crear un usuario utilizando google sign in. Primero debo habilitarlo en firebase y luego lo puedo utilizar de aca. Hago el dispatch de checkingCredetials() y despues guardo en la const result la respuesta que espero de la funcion signInWithGoogle(), esta funcion viene de firebase.
export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch ( checkingCredentials() );

        const result = await signInWithGoogle();
        //aca valido, y si result es distinto de true, dispatch de la accion logout y muestro el errorMessage.
        if( !result.ok) return dispatch( logout( result.errorMessage ) )

        //si todo salio bien, dispath de la accion login. A login le paso como parametro el result con las credenciales que vienen de signInWithGoogle()
        dispatch( login( result ) )
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async(dispatch) => {
        dispatch( checkingCredentials() );

        const {uid, photoURL, errorMessage, ok} = await registerUserLocal({ email, password, displayName })

        
        if (!ok) return (dispatch( logout( {errorMessage} ) ))
    
        dispatch( login( {uid, displayName, email, photoURL} ))
    }


}


//crear un thunk para validar si el usuario que estoy intentanto ingresar, existe en firebase.
export const startLoginWithEmailPassword = ({ email, password }) => {

    return async(dispatch) => {
        dispatch( checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password });
        console.log(result);

        if( !result.ok ) return dispatch( logout( result ));
        
        dispatch( login( result ) );
    }

    
}


export const startLogout = () => {

    return async(dispatch) => {
        await logoutFireBase

        dispatch(clearNoteLogout())
        dispatch( logout() )
    }

}


export const startUploadingFiles = (files = []) => {
    return async(dispatch, getState) => {

        dispatch(setSaving());

        const filesUploadPromises = [];
        for (const file of files) {
            filesUploadPromises.push( fileUpload(file) )
        }

        const photosURLs = await Promise.all(filesUploadPromises);
        
        dispatch(setPhotosToActiveNote( photosURLs ))

    }
}