import React, { useEffect, useState } from 'react'
import Navbar from '../Share/NavBar';
import useToastify from '../../../hooks/useToastify';
import InactiveUsers from '../Admin/InactiveUsers';
export default function AdminHome({ user }) {
  const showToast = useToastify()
  const [inactiveUsers, setInactiveUsers] = useState([])

  const getInactiveUsers = async (values, action) => {
    try {
      const api = axios.create({
        baseURL: '/', // Replace with your backend URL
        withCredentials: true, // Enable cookies
    });
      const response = await api.get("/inactiveusers")
      setInactiveUsers(response.data.inactiveUsers)

      console.log(response);
    } catch (error) {
      showToast('error', error.response?.data.message)
    }
  };

  useEffect(() => {
    getInactiveUsers()
  }, [])

  return (
    <div>
      <Navbar username={user.username} role={user.role} />
      <div className="container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100  items-center justify-center p-6 mt-14">
        {/* <div className="grid grid-cols-12"> */}
        {/* <UserArtworks /> */}
        {/* </div> */}
        <InactiveUsers users={inactiveUsers} />

      </div>
    </div>
  )
}
