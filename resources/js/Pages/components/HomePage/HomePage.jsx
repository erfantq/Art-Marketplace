
import React, { useEffect, useState } from 'react'
import Navbar from '../NavBar'
import UserArtworks from "../Artworks/UserArtworks";
// import api from '../../../api/axiosApi'
import { usePage } from '@inertiajs/react';
export default function HomePage({ arts, user }) {
    // const [user, setUser] = useState(null);
    // // const [arts, setArts] = useState([]);
    // const { arts, user } = usePage()


    // const fetchUserAndArts = async () => {
    //     try {
    //         const response = await api.get("/")
    //         console.log(response);
    //         setUser(response.data.user);
    //         // setArts(response.data.arts);
    //         console.log(arts);
    //         console.log(user);

    //     } catch (error) {
    //         // showToast('error', error.response)
    //         // showToast('error', "error.response")
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        console.log("arts",arts);
        console.log("user", user);
        // fetchUserAndArts()
    }, [user, arts])


    return (
        <div>
            {/* <Navbar /> */}
            <div className="container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100  items-center justify-center p-6 mt-14">
                {/* <div className="grid grid-cols-12"> */}
                {/* <UserArtworks /> */}
                {/* </div> */}
            </div>
        </div>
    );
}

