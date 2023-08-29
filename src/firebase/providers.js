import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";




const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider);

        const { displayName, email, photoURL, uid } = result.user;

        return { 
            ok: true, 
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
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user
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