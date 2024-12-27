import { useFormik } from 'formik';
import React, { useState } from 'react'
import { PurchaseSchema } from '../../schemas';
import axios from 'axios';
import { IoPricetagsOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import useToastify from '../../../hooks/useToastify';

export default function PurchaseArtwork({ art, user }) {

    const [btnSubmit, setBtnSubmit] = useState(false)
    const showToast = useToastify()
    const onSubmit = async (values) => {
        try {
            const api = axios.create({
                baseURL: '/',
                withCredentials: true
            })

            const response = await api.post('/purchase', values)
            console.log(response);
            showToast('success', response.data.message)
        } catch (error) {
            showToast("error", error.response?.data.message)
            console.log(error);
        }


    }

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useFormik({
        initialValues: {
            artId: art._id.$oid || '',
            number: 1,
            username : user.username
        },
        validationSchema: PurchaseSchema,
        onSubmit
    });


    const styles = {

        input: {
            valid: {
                grid: " w-full h-9 px-2 py-1 mb-2 rounded-md ",
                color: " text-sm bg-gray-800 border border-gray-700 ",
                focus: " focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 "
            },
            inValid: {
                grid: " w-full h-9 px-2 py-1 mb-2 rounded-md  ",
                color: " text-sm bg-gray-800 border border-red-700 text-gray-300 ",
                focus: " focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-red-500 "
            }
        },

        buttun: {
            normal: {
                grid: "  btn btn-block my-4 ",
                color: " text-sm font-medium text-white bg-purple-700 "
            },
            submitting: {
                grid: "  btn btn-block my-4  ",
                color: " text-sm font-medium text-white bg-purple-400 cursor-not-allowed "

            }
        },
    }

    return (
        <div>
            <input className="modal-state" id="modal-1" type="checkbox" />
            <div className="modal">
                <label className="modal-overlay " htmlFor="modal-1"></label>
                <div className="modal-content flex flex-col gap-5 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 w-1/2 container ">
                    {/* method='post' action='/purchase' */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-4">
                        <label htmlFor="modal-1" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-purple-600">✕</label>
                        <h2 className="text-3xl font-bold col-span-full">Purchase {art.name}</h2>
                        <span className='col-span-2 flex items-center my-2 text-gray-300'>
                            <IoPricetagsOutline className='mr-2' />
                            Price : {art.price}
                        </span>
                        <span className='col-span-2 flex items-center my-2 text-gray-300'>
                            <IoWalletOutline className='mr-2' />
                            Your Wallet : {user.wallet_balance}
                        </span>
                        <div className="col-span-2 pr-3 my-2">
                            <label
                                className="block mb-2 text-sm font-medium text-gray-400"
                                htmlFor="number"
                            >
                                Number of Artwork
                            </label>
                            <input
                                type="number"
                                id="number"
                                name="number"
                                min={1}
                                max={art.number}
                                className={
                                    errors.number && touched.number

                                        ? JSON.stringify(styles.input.inValid)
                                        : JSON.stringify(styles.input.valid)
                                }
                                placeholder="Enter your password"
                                // value={values.number}
                                value={values.number}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.number && touched.number && (
                                <span className={JSON.stringify(styles.span.error)}>
                                    {errors.number}
                                </span>
                            )}
                        </div>

                        <div className={`col-span-2 items-center flex
                        ${art.price * values.number <= user.wallet_balance ? 'text-green-500' : 'text-red-500'} `}>
                            <span className='col-span-2 flex items-center mt-4'>
                                <IoWalletOutline className='mr-2' />
                                Total Price : {art.price * values.number}
                            </span>
                        </div>

                        <div className="col-span-4 ">
                            <button
                                type="submit"

                                className={btnSubmit
                                    ? JSON.stringify(styles.buttun.submitting)
                                    : JSON.stringify(styles.buttun.normal)}
                            >
                                {btnSubmit ? "Purchasing..." : "Purchase"}
                                {btnSubmit && (<div className="ml-1 spinner-dot-pulse spinner-sm [--spinner-color:var(--gray-2)]">
                                    <div className="spinner-pulse-dot"></div>
                                </div>)}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
