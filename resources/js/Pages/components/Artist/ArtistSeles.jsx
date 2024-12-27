import React, { useEffect } from 'react'
import axios from 'axios';
export default function ArtistSeles() {
        const createArtwork = async (values, action) => {
        try {
          const api = axios.create({
            baseURL: '/', // Replace with your backend URL
            withCredentials: true,
            headers: {
                'X-Inertia': true // Include this header for Inertia requests
            }
          });
          const response = await api.get("/orders")
        //   setArts(response.data.arts)
          console.log(response);
        } catch (error) {
            console.log(error);
        //   showToast('error', error.response?.data.message)
        }
      };
      useEffect(()=>{
        createArtwork()
      },[])
  return (
    <div>ArtistSeles</div>
  )
}
