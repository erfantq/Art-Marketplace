import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
// import ArtistPage from './components/ArtistPage'
import ArtistPage from './components/Artist/ArtistPage'
import CreateBiddingg from './components/Artist/CreateBiddingg'
import User from './components/User/User'
import UserArtWorks from './components/User/UserArtWorks'
import HomePage from './components/HomePage/HomePage'
import Buy from './components/User/Buy'
import WalletCharge from './components/Share/WalletCharge'


export default function Home() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/home' element={<HomePage />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/:name' element={<ArtistPage />}/>
        <Route path='/user/:name' element={<User />}/>
        <Route path='/artist/:name/create-bidding' element={<CreateBiddingg />}/>
        <Route path='/login/user:name/artworks' element={<UserArtWorks />}/>
        <Route path='/login/user:name/buy' element={<Buy />}/>
        <Route path='/:name/walletcharge' element={<WalletCharge />}/>
        {/* <Route path='/*' element={<Navigate to='/login' />}/> */}
        
      </Routes>
    </BrowserRouter>

  )
}
