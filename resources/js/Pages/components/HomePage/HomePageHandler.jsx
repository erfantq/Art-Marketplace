import React, { useEffect } from 'react'
import UserHome from './UserHome'
import ArtistHome from './ArtistHome'
import AdminHome from './AdminHome'
import DefaultHome from './DefaultHome';

export default function HomePageHandler({ user, arts }) {


    switch (user?.role?.toLowerCase()) {
        case 'user':
            return (<UserHome user={user} arts={arts}/>)
        case 'artist':
            return (<ArtistHome user={user} />)
        case 'admin':
            return (<AdminHome user={user} arts={arts}/>)
        default:
            return (<DefaultHome user={user} arts={arts} />)

    }

};