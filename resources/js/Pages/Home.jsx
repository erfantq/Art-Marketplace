import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'


export default function Home() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register />}/>
        {/* <Route path='/login/:name' element={<Main />}/> */}
        <Route path='/*' element={<Navigate to='/login' />}/>
      </Routes>
    </BrowserRouter>

  )
}
