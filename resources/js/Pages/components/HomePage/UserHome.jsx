import React, { useEffect, useState } from 'react'
import Navbar from '../Share/NavBar';
import UserArtworks from '../Artworks/UserArtworks';
import ShowBiddings from './ShowBiddings';
import Notification from '../Share/Notification';

export default function UserHome({ user, arts, notifications }) {

    const [biddingArts, setBiddingArts] = useState(arts)
    useEffect(() => {
        console.log(user);
        setBiddingArts((prevArts) => prevArts.filter((art) => art.bidding !== false))
        console.log('bidd', biddingArts);
        console.log('noti', notifications);
    }, [])
    return (
        <div>
            <Navbar username={user.username} role={user.role} />
            <div className="relative container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100  items-center justify-center p-6 mt-14">
                {/* <div className="grid grid-cols-12"> */}
                {/* <UserArtworks /> */}
                {/* </div> */}
                <UserArtworks arts={arts} />
                <div className="flex items-center gap-1">
                    Biddings
                    <div className="divider divider-horizontal w-full shadow-lg shadow-purple-800/50 bg-transparent"></div>
                </div>
                <ShowBiddings arts={biddingArts} />

                <label htmlFor='drawer-1'
                    className='btn btn-secondary absolute top-96'>
                    Notifications
                </label>
                <Notification />
            </div>
        </div>
    )
}
