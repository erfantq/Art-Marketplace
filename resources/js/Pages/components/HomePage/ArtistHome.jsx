import React, { useEffect, useState } from 'react'
import Navbar from '../Share/NavBar';
import UserArtworks from '../Artworks/UserArtworks';
import useToastify from '../../../hooks/useToastify';
export default function ArtistHome({ user }) {

  const showToast = useToastify()
  const [arts, setArts] = useState([])

  const getArtistArts = async (values, action) => {
    try {
      const api = axios.create({
        baseURL: '/', // Replace with your backend URL
        withCredentials: true
    });
      const response = await api.get(user.username + "/arts")
      setArts(response.data.arts)

      console.log(response);
    } catch (error) {
      showToast('error', error.response?.data.message)
    }
  };

    useEffect(() => {
      getArtistArts()
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
