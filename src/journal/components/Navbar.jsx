import { LogoutOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store/auth"



export const Navbar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch()

    const onLogout = () => {

        dispatch( startLogout() )

    }
     

  return (
    <AppBar 
        position="fixed"
        sx={{ 
            width:{ sm: `calc(100% - ${ drawerWidth }px)` },
            ml:{ sm: `${ drawerWidth }`}
        }}>

        <Toolbar>
            <IconButton color="inherit" edge='start' sx={{ mr: 2, display: { sm: 'none' }}}>
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>

                <Typography>JournalApp</Typography>

                <LogoutOutlined color="error" cursor='pointer' onClick={onLogout} />

            </Grid>

        </Toolbar>    

    </AppBar>
  )
}
