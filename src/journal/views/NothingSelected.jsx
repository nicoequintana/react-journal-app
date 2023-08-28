import { StarOutline } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"



export const NothingSelected = () => {


  return (
    <>
        <Grid className="animate__animated animate__fadeIn animate__faster" container spacing={ 0 } direction='column' alignItems='center' justifyContent='center' sx={{ minHeight: 'calc( 100vh - 110px )', backgroundColor: 'primary.main', borderRadius
        : 2}}>

            <Grid item xs={ 12 }>
                <StarOutline sx={{ fontSize: 100, color:'white' }} />
            </Grid>
            <Grid item >
                <Typography variant="h5" sx={{ color: 'white', fontSize: 25 }} >Selecciona o crea una entrada.</Typography>
            </Grid>

        </Grid>
    </>
  )
}
