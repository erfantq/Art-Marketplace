import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useToastify from '../../../hooks/useToastify'
import { CiCircleAlert } from "react-icons/ci";
import { number } from 'yup';
export default function ArtistPurchaseHistory({ purchases }) {

  // const [dataUsers, setDataUsers] = useState(users)
  const [btnSubmit, setBtnSubmit] = useState({})
  const [userSelect, setUserSelect] = useState('')
  const showToast = useToastify()

  // const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault()
  //     console.log(userSelect);
  //     const api = axios.create({
  //       baseURL: '/',
  //       withCredentials: true
  //     })

  //     const response = await api.get('/makeactive/' + userSelect)

  //     console.log(response);
  //     setBtnSubmit((prevBtn) => setBtnSubmit({ ...prevBtn, [userSelect]: true }))
  //     setBtnSubmit(true)
  //     // users((prevUser) => prevUser.filter(user => user.username !== userSelect))
  //     // setUsers((prevUser) => prevUser.filter(user => user.username !== userSelect))
  //     setUserSelect('')
  //     setTimeout(() => {
  //       setDataUsers((prevUsers) => prevUsers.filter(user => user.username !== userSelect));
  //       setBtnSubmit((prev) => ({ ...prev, [userSelect]: false }));
  //       showToast('success', response.data.message)
  //     }, 5000);


  //   } catch (error) {
  //     showToast('error', error.response?.data.message)
  //     setBtnSubmit((prev) => ({ ...prev, [userSelect]: false }));

  //   }
  // }

  useEffect(() => {
    // setDataUsers(users)
    console.log(purchases);
  }, [])

  const styles = {
    buttun: {
      normal: {
        grid: " btn h-9 px-2 py-2 my-4 rounded-md col-span-4",
        color: " text-sm font-medium text-white bg-purple-700 "
      },
      submitting: {
        grid: " w-full btn h-9 px-2 py-2 my-4 rounded-md  ",
        color: " text-sm font-medium text-white bg-purple-400 cursor-not-allowed "

      }
    },
    noUsers: "flex flex-col items-center justify-center h-screen col-start-4 col-end-9 text-gray-400 text-3xl", // Centering styles

  }
  return (

    <div>s;dlf</div>
  )
}
