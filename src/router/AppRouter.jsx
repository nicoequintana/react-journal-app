import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import { useCheckAuth } from "../hooks"
import { CheckingAuth } from "../ui"



export const AppRouter = () => {



  const { status } = useCheckAuth()




  if( status === 'checking') {
    return <CheckingAuth />
  }


  return (
    <Routes>
      {
        (status === 'authenticated')
        ? <Route path="/*" element={ <JournalRoutes  /> } />
        : <Route path="/auth/*" element={ <AuthRoutes /> }/>
      }

      <Route path="/*" element={ <Navigate to='/auth/login'  />}/>
        {/* login y registro */}
        {/* se pone /auth/* para hacer referencia a que cualquier pagina o path que este dentro de auth, me va a mostrar authroutes */}
        {/* <Route path="/auth/*" element={ <AuthRoutes /> }/> */}

        {/* JournalApp */}
        {/* <Route path="/*" element={ <JournalRoutes  /> } /> */}


    </Routes>
  )
}
