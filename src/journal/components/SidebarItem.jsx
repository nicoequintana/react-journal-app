import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote} from "../../store/journal"
import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"


export const SidebarItem = ({title, body, id, date, imageURL = []}) => {

    const dispatch = useDispatch()

    const onClickNote = () => {
        dispatch(setActiveNote({title, body, id, date, imageURL}))
    }
    
    //memorizar el titulo que recibo, y si supera los 9 caracteres, con substring lo corto y le agrego los 3 puntitos, sino, lo devuelve tal cual viene de firebase
    const newTitle = useMemo( () => {

        return title.length > 12
            ? title.substring(0, 12) + '...'
            : title

    }, [ title ])

    const newBody = useMemo( () => {

        return body.length >10
            ? body.substring(0, 10) + '...'
            : body

    }, [ body ] )


  return (
    <ListItem disablePadding>
        <ListItemButton
            onClick={onClickNote}
        >

            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container direction='column'>
                <ListItemText  primary={ newTitle } />
                <ListItemText secondary={ newBody } />
            </Grid>

        </ListItemButton>
    </ListItem>
  )
}
