import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
// import ArtistPage from './components/ArtistPage'
import UserProfile from './components/User/UserProfile'
// import EditUserProfile from './components/User/EditUserProfile'
import CreateBiddingg from './components/Artist/CreateBiddingg'
import HomePage from "./components/HomePage/HomePage";
import Buy from "./components/User/Buy";
import WalletCharge from "./components/Share/WalletCharge";
import CreateArtwork from "./components/Artist/CreateArtwork";
import UserArtworks from './components/Artworks/UserArtworks'
import SelectedArtwork from './components/Artworks/SelectedArtwork'

export default function Home() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/:name/createArtwork"
                    element={<CreateArtwork />}
                />
                <Route path="/user/:name/profile" element={<UserProfile />} />
                {/* <Route path="/user/:name/profile/update" element={<EditUserProfile />} /> */}
                
                <Route
                    path="/:name/createBiddingg"
                    element={<CreateBiddingg />}
                />
                <Route path='/home/arts/:artId' element={<SelectedArtwork />} />
                <Route path="/login/user:name/buy" element={<Buy />} />
                <Route path="/:name/walletcharge" element={<WalletCharge />} />
                {/* <Route path="/*" element={<Navigate to="/login" />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
