import React, { useEffect } from 'react'
import UserHome from './UserHome'
import ArtistHome from './ArtistHome'
import AdminHome from './AdminHome'
export default function HomePageHandler({ user, arts }) {
    let Component;

    switch (user?.role?.toLowerCase()) {
        case 'user':
            return (<UserHome user={user} arts={arts}/>)
        case 'artist':
            return (<ArtistHome user={user} arts={arts}/>)
        case 'admin':
            return (<AdminHome user={user} arts={arts}/>)
        default:
            return (<UserHome user={user} arts={arts}/>)

    }

};