import { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { DeleteOutline, Save, UploadOutlined } from "@mui/icons-material"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hooks/useForm'
import { ImageGallery } from "./ImageGallery"
import { startDeletingNote, startSavingNote, setActiveNote } from '../../store/journal'
import { startUploadingFiles } from '../../store/auth'



export const NoteView = () => {

    const dispatch = useDispatch()

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal)

    const{ body, title, date, onInputChange, formState } = useForm( note )

    const fileInputRef = useRef()

    const noteDate = useMemo( ()=> {

        const dateString = new Date( date );
        return dateString.toUTCString()

    }, [date] )

    useEffect(() => {
      dispatch(setActiveNote(formState))

    }, [formState])

    useEffect(() => {
      
        if(messageSaved.length > 0){
            Swal.fire('Nota Actualizada', messageSaved, 'success')
        } 
      
    }, [messageSaved])
    
    

    const onSaveNote = () => {
        dispatch(startSavingNote())
        
    }

    const onFileInputChange = ({ target }) => {

        if (target.files === 0) return

        dispatch(startUploadingFiles (target.files))
    }

    const onDelete = () => {

        dispatch( startDeletingNote() )

    }

    return (
        <Grid 
            container 
            direction='row' 
            justifyContent='space-between' 
            alignItems='center' 
            sx={{mb: 1}}
            className='className="animate__animated animate__fadeIn animate__faster' 

        >

            <Grid item>

                <Typography fontSize={39} fontWeight='light'>{noteDate}</Typography>

            </Grid>

            <Grid
                item
            >
                <input 
                    type='file' 
                    multiple 
                    onChange={onFileInputChange} 
                    style={{display: 'none'}}
                    ref={fileInputRef}
                    />

                <IconButton
                    color='primary'
                    disabled={!!isSaving}
                    onClick={()=>fileInputRef.current.click()}
                >
                    <UploadOutlined  />
                </IconButton>

            </Grid>

            <Grid item>

                <Button 
                    disabled={!!isSaving}
                    onClick={onSaveNote}
                    color='primary'  
                    sx={{ 
                        padding: 2, 
                        border: 1 }}
                >
                    <Save 
                        sx={{ 
                            mr: 1 
                            }} 
                    />
                    Guardar
                </Button>

            </Grid>

            <Grid container sx={{ mt: 2 }}>

                <TextField 
                type='text' 
                variant='filled' 
                fullWidth 
                multiline 
                placeholder='Ingresa un titulo para la entrada' 
                label='Titulo de esta nota' 
                name='title'
                value={title}
                onChange={onInputChange}
                />

                <TextField 
                sx={{ mt: 2 }} 
                type='text' 
                variant='filled' 
                fullWidth 
                multiline 
                placeholder='Qué pasó hoy?' 
                minRows={ 5 } 
                label='Expresate'
                name='body'
                value={body}
                onChange={onInputChange}
                />

            </Grid>

            <Grid
            container
            justifyContent='end'
            >
                <Button 
                    onClick={onDelete}
                    sx={{mt: 2}}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            {/* <ImageGallery images={note.imageURL} /> */}
            {note.imageURL && <ImageGallery images={note.imageURL} />}

        </Grid>
    )
}
