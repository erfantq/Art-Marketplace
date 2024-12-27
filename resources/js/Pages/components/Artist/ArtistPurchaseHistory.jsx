import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useToastify from '../../../hooks/useToastify'
import { CiCircleAlert } from "react-icons/ci";
import { number } from 'yup';
import Navbar from '../Share/NavBar';
export default function ArtistPurchaseHistory({ purchases, user }) {

  const [purchaseSelect, setPurchaseSelect] = useState('')
  const [dataPurchases, setDataPurchases] = useState(purchases)
  const [btnSubmit, setBtnSubmit] = useState({})
  const [userSelect, setUserSelect] = useState('')
  const showToast = useToastify()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      console.log(userSelect);
      const api = axios.create({
        baseURL: '/',
        withCredentials: true
      })

      const response = await api.get('/approve/' + purchaseSelect)

      console.log(response);
      setBtnSubmit((prevBtn) => setBtnSubmit({ ...prevBtn, [purchaseSelect]: true }))
      setBtnSubmit(true)
      setPurchaseSelect('')
      setTimeout(() => {
        setPurchaseSelect((prevUsers) => prevUsers.filter(purchase => purchase._id.$oid !== purchaseSelect));
        setBtnSubmit((prev) => ({ ...prev, [purchaseSelect]: false }));
        showToast('success', response.data.message)
      }, 5000);


    } catch (error) {
      showToast('error', error.response?.data.message)
      setBtnSubmit((prev) => ({ ...prev, [purchaseSelect]: false }));

    }
  }

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

    <div className="container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100  items-center justify-center p-6 mt-14">
      <Navbar username={user.username} role={user.role} />
      <div className="grid grid-cols-12">

        {purchases.length === 0 ? (
          <div className={styles.noUsers}>
            <CiCircleAlert className='text-5xl mb-2' />
            <span className='flex text-center'>History is Empty!</span>
          </div>
        )
          : dataPurchases.map((purchase, index) => (
            <div
              key={purchase._id.$oid}
              className="col-span-5 container bg-gray-800 rounded-lg shadow-lg transform hover:mx-2 transition-all duration-300"
            >
              <form className="p-6 grid grid-cols-3 " method='get' action={'/approve/' + purchaseSelect}>
                <p className="col-span-2 font-semibold text-2xl items-center ">{index + 1}. {purchase.buyer}
                  <p className='text-sm font-normal'>{purchase._id.$oid}</p>
                </p>
                <ol className="steps col-span-full mt-2">
                  <li className={`step step-secondary step-active overflow-hidden ${purchase.order_status == 0 ? 'step-active' : 'step-done'}`}>
                    <div className="step-circle">0</div>
                    <h3>In progress</h3>
                  </li>
                  <li className={`step step-secondary step-active overflow-hidden ${purchase.order_status == 1 ? 'step-active' : 'step-done'}`}>
                    <div className="step-circle">1</div>
                    <h3>Done</h3>
                  </li>
                </ol>
                {/* <p className='col-span-2 items-center flex'>Created at : {user.created_at.$date.$numberLong}</p> */}
                <button type='submit'
                  className={btnSubmit[purchase.username] ? JSON.stringify(styles.buttun.submitting)
                    : JSON.stringify(styles.buttun.normal)}
                  onClick={() => setPurchaseSelect(purchase._id.$oid)}>
                  Track
                  {btnSubmit[purchase.username] && (<div className="ml-2 spinner-dot-pulse spinner-sm [--spinner-color:var(--gray-2)]">
                    <div className="spinner-pulse-dot"></div>
                  </div>)}
                </button>
              </form>
            </div>
          ))}
      </div>
      {/* {selectArt && <ArtworkDrawer selectArt={selectArt} />} */}
    </div>)
}
