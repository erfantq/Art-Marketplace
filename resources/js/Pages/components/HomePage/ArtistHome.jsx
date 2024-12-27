import React, { useEffect, useState } from 'react'
import Navbar from '../Share/NavBar';
import UserArtworks from '../Artworks/UserArtworks';
import useToastify from '../../../hooks/useToastify';
import ArtistArtworks from '../Artworks/ArtistArtwork';
import Notification from '../Share/Notification';
export default function ArtistHome({ user,notifications }) {

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
      // response = await api.get("/orders")
      // console.log("res3", response);

    } catch (error) {
      showToast('error', error.response?.data.message)
    }
  };

  const getOrders = async (values, action) => {
    try {
      const api = axios.create({
        baseURL: '/', // Replace with your backend URL
        withCredentials: true
      });
      const response = await api.get("orders")
      // setArts(response.data.arts)
      // response = await api.get("/orders")
      // console.log("res3", response);
      console.log("ress", response);

    } catch (error) {
      showToast('error', error.response?.data.message)
    }
  };

  useEffect(() => {
    getArtistArts()
    getOrders()
  }, [])

  return (
    <div>
      <Navbar username={user.username} role={user.role} />
      <div className="container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100  items-center justify-center p-6 mt-14">
        {/* <div className="grid grid-cols-12"> */}
        {/* <UserArtworks /> */}
        {/* </div> */}
        <ArtistArtworks arts={arts} user={user} />
        <Notification notifications={notifications}/>


      </div>
    </div>
  )
}
