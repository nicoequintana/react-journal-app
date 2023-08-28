import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";




const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult( result );

        //aca yo desestructura y capto los datos que quiero del 'result' del user. Esta ingo mel a proporciona firebase con google cuando hago la autenticacion.
        const { displayName, email, photoURL, uid } = result.user;

        return { //este return, es lo que me devuelve la funcion signInWithGoogle. En el return devuelvo si esta ok o no, y los datos que desestructure arriba en el try del result.user.
            ok: true, 
            //informacion del usuario
            displayName, email, photoURL, uid
        }
        

    } catch(error) {

        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);


        return {
            ok: false, 
            errorMessage
        }
    }
}




export const registerUserLocal = async({ email, password, displayName }) => {

    
    try {
        //esta funcion viene de firebase
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user
        //la funcion updateProfile viene de Firebase. con FirebaseAuth.currentUser puedo saber que usuario esta logueado actualmente y obtener el displayName.
        await updateProfile( FirebaseAuth.currentUser, { displayName } )


        return {
            ok: true,
            uid, photoURL, displayName, email
        }

    } catch (error) {
         
        return { 
            ok: false, 
            errorMessage: error.message 
        }
    }


}


//crear una accion para que usar en el thunk y validar si el usuario existe en firebase
export const loginWithEmailPassword = async({ email, password }) => {

    try{
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL, displayName } = resp.user;
        console.log( resp )

        return{
            ok: true, 
            uid, photoURL, displayName
        }

    }
    catch (error) {
        
        return{
            ok: false, 
            errorMessage: error.message
        }
    }

}


export const logoutFireBase = async() => {
    return await FirebaseAuth.signOut()
}