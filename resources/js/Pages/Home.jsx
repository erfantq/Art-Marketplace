import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Login from './components/Login'


function Home() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path='/login/:name' element={<Main />}/>
        <Route path='/signUp' element={<CreateUser />}/>
        <Route path='/*' element={<Navigate to='/login' />}/>
      </Routes>
    </BrowserRouter>

  )
}

export default Home