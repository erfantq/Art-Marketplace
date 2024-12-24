import React, { useEffect } from 'react'
import Navbar from '../Share/NavBar';
import UserArtworks from '../Artworks/UserArtworks';

export default function ArtistHome({ user, arts }) {

    useEffect(() => {
        console.log(user);
    }, [])
    return (
        <div>
            <Navbar username={user.username} role={user.role} />
            <div className="container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100  items-center justify-center p-6 mt-14">
                {/* <div className="grid grid-cols-12"> */}
                {/* <UserArtworks /> */}
                {/* </div> */}
                <UserArtworks arts={arts} />


            </div>
        </div>
    )
}
