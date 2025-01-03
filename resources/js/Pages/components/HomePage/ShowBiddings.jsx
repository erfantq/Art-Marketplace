import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useToastify from '../../../hooks/useToastify'
import { CiCircleAlert } from "react-icons/ci";
import { number } from 'yup';
import { Link } from '@inertiajs/react';
export default function ShowBiddings({ arts }) {

    const [dataArts, setDataArts] = useState(arts)
    const [btnSubmit, setBtnSubmit] = useState({})
    const [userSelect, setUserSelect] = useState('')
    const showToast = useToastify()

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const api = axios.create({
                baseURL: '/',
                withCredentials: true
            })

            const response = await api.get('/makeactive/' + userSelect)

            console.log(response);
            setBtnSubmit((prevBtn) => setBtnSubmit({ ...prevBtn, [userSelect]: true }))
            setBtnSubmit(true)
            // users((prevUser) => prevUser.filter(user => user.username !== userSelect))
            // setUsers((prevUser) => prevUser.filter(user => user.username !== userSelect))
            setUserSelect('')
            setTimeout(() => {
                setDataUsers((prevUsers) => prevUsers.filter(user => user.username !== userSelect));
                setBtnSubmit((prev) => ({ ...prev, [userSelect]: false }));
                showToast('success', response.data.message)
            }, 5000);


        } catch (error) {
            showToast('error', error.response?.data.message)
            setBtnSubmit((prev) => ({ ...prev, [userSelect]: false }));

        }
    }

    useEffect(() => {
        setDataArts(arts)
        console.log(arts);
    }, [arts])

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
        noUsers: "flex flex-col items-center justify-center  col-start-4 col-end-9 text-gray-400 text-3xl", // Centering styles

    }
    return (

        <div className="grid grid-cols-11 gap-6">
            {dataArts.length === 0 ? (
                <div className={styles.noUsers}>
                    <CiCircleAlert className='text-5xl mb-2' />
                    <span className='flex text-center'>Bidding for an artwork does not exist!</span>
                </div>
            )
                : dataArts.map((art, index) => (
                    <div
                        key={art.name}
                        className="col-span-5 container bg-gray-800 rounded-lg shadow-lg transform hover:mx-2 transition-all duration-300"
                    >
                        <form className="p-6 grid grid-cols-3 " onSubmit={handleSubmit}>
                            <p className="col-span-2 font-semibold text-2xl items-center flex">{index + 1}. {art.name}
                                {/* <p className='text-sm font-normal'>{user.first_name} , {user.last_name} , {user.email}</p> */}
                            </p>
                            {/* <p className='col-span-2 items-center flex'>Created at : {user.created_at.$date.$numberLong}</p> */}
                            <Link
                                className={JSON.stringify(styles.buttun.normal)}
                                href={'/bidding/' + art._id.$oid}
                            >
                                Price offer
                            </Link>
                        </form>
                    </div>
                ))}
            {/* {selectArt && <ArtworkDrawer selectArt={selectArt} />} */}
        </div>)
}
