import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal/thunks";
import { NoteView, NothingSelected } from "../views";
import { JournalLayout } from "../layout/JournalLayout";
import { AddOutlined, MailOutline } from "@mui/icons-material";
import { IconButton } from "@mui/material";

//import { Typography } from "@mui/material";


export const JournalPage = () => {

  const dispatch = useDispatch()

  const { isSaving, active } = useSelector( state => state.journal )

  const onClickNewNote = () => {
    dispatch( startNewNote() )
  }
    
  return (
    <>
      <JournalLayout>

        {!!active ? <NoteView /> : <NothingSelected />}

        <IconButton
          disabled={isSaving}
          onClick={onClickNewNote}
          size="large"
          sx={{
            color:'white',
            backgroundColor: 'error.main',
            ':hover': { backgroundColor: 'error.main', opacity: .8 },
            position: 'fixed',
            right: 50,
            bottom: 50
          }}>
          <AddOutlined sx={{ fontSize: 30 }} />

        </IconButton>

      </JournalLayout>
    </>
  )

}