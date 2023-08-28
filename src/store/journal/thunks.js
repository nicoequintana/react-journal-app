import {collection, deleteDoc, doc, setDoc} from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyNote, deleteNoteById, noteUpdated, savingNewNote, setActiveNote, setNotes, setSaving } from './';
import { loadNotes } from '../../helpers/loadNotes';


export const startNewNote = () => {

    return async(dispatch, getState) => {
        dispatch(savingNewNote());

        const {uid} = getState().auth
        const { isSaving }= getState().journal
        

        //para grabar en firebase vamos a usar el uid del usuario
        const newNote = {
            title: '',
            body: '',
            imageURL: '',
            date: new Date().getTime(),
        };

        //vamos a crear la referencia al documento donde quiero insertar la nota    
        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) )
        await setDoc( newDoc, newNote )

        newNote.id = newDoc.id

        //!dispatch
        
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
        //dispatch para activar la nota
    }


};



export const startLoadingNotes = () => {

    return async(dispatch, getState) => {
        
        const {uid} = getState().auth;
        if (!uid) throw new Error('El usuario no existe en la base de datos.')

        const notes = await loadNotes(uid)

        dispatch( setNotes( notes ) )

    };

}


export const startSavingNote = () => {

    return async(dispatch, getState) => {

        dispatch(setSaving());

        const {uid} = getState().auth;
        const {active:note} = getState().journal;


        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        
        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }`);

        await setDoc(docRef, noteToFirestore, { merge: true })

        dispatch(noteUpdated(note))
    }

}

export const startDeletingNote = () => {

    return async(dispatch, getState) => {

        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const docRef = doc(FirebaseDB, `${ uid }/journal/notes/${ note.id }`)
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id))
        


    }

}