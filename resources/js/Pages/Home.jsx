import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Login from './components/Login'
import RegisterApp from './RegisterApp'

function Home() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        {/* <Route path='/login/:name' element={<Main />}/> */}
        <Route path='/register' element={<RegisterApp />}/>
        <Route path='/*' element={<Navigate to='/login' />}/>
      </Routes>
    </BrowserRouter>

  )
}

export default Home