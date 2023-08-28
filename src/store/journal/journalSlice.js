import { createSlice } from '@reduxjs/toolkit'



export const journalSlice = createSlice({

  name: 'journal',
  initialState: {
      isSaving: false, 
      messageSaved: '',
      notes: [],
      active: null, 
      // activeNote: {
      //   id: '123',
      //   title: '',
      //   body: '',
      //   date: 123123,
      //   imageURL: [],
      // },
  },

  reducers: {
    
    savingNewNote: (state) => {
      state.isSaving = true;
    },

    addNewEmptyNote: (state, action) => {
      state.notes.push( action.payload );
      state.isSaving = false;
    },

    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = '';
    },

    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = '';
      //todo: mensaje de error, no olvidar generar la logica
    },

    noteUpdated: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map( (note) => { 
        if ( note.id === action.payload.id ){
          return action.payload
        }
        return note
       })
       
       state.messageSaved = `La nota "${ action.payload.title }" fue actualizada correctamente.`
    },

    setPhotosToActiveNote: (state, action) => {
      console.log(action)
      state.active.imageURL = [...state.active.imageURL, ...action.payload];
      state.isSaving=false;
    },

    clearNoteLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = '',
      state.notes = [],
      state.active = null;
    },

    deleteNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter(note => note.id !== action.payload);
      

    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  addNewEmptyNote,
  clearNoteLogout,
  deleteNoteById,
  noteUpdated,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,

 } = journalSlice.actions