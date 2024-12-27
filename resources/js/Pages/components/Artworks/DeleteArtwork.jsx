import { useFormik } from 'formik';
import React, { useState } from 'react'
import { PurchaseSchema } from '../../schemas';
import axios from 'axios';
import { IoPricetagsOutline } from "react-icons/io5";
import { IoWalletOutline } from "react-icons/io5";
import useToastify from '../../../hooks/useToastify';

export default function DeleteArtwork({ art, username }) {

    const [btnSubmit, setBtnSubmit] = useState(false)
    const showToast = useToastify()
    const onSubmit = async (values) => {
        try {
            const api = axios.create({
                baseURL: '/',
                withCredentials: true
            })

            const response = await api.delete(username + '/arts/' + art._id.$oid)
            console.log(response);
            setBtnSubmit(true);
            showToast('success', response.data.message)
            setTimeout(() => {
                if (response.status === 200) {
                    window.location.href = "/"
                }
                setBtnSubmit(false);
            }, 5000);
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
            number: 1
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
            <input className="modal-state" id="modal-2" type="checkbox" />
            <div className="modal">
                <label className="modal-overlay " htmlFor="modal-2"></label>
                <div className="modal-content flex flex-col gap-5 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 w-1/2 container ">
                    {/* method='post' action='/purchase' */}
                    <form onSubmit={handleSubmit} className="grid grid-cols-4">
                        <label htmlFor="modal-2" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-purple-600">✕</label>
                        <h2 className="text-3xl font-bold col-span-full">Are you sure? </h2>

                        <div className="col-span-3 mr-2 mt-4">
                            <button
                                type="submit"

                                className={btnSubmit
                                    ? JSON.stringify(styles.buttun.submitting)
                                    : JSON.stringify(styles.buttun.normal) + " bg-red-500 "}
                            >
                                {btnSubmit ? "Deleting..." : "Delete"}
                                {btnSubmit && (<div className="ml-1 spinner-dot-pulse spinner-sm [--spinner-color:var(--gray-2)]">
                                    <div className="spinner-pulse-dot"></div>
                                </div>)}
                            </button>
                        </div>
                        <div className="col-span-1 mt-4">
                            <label htmlFor="modal-2" className={JSON.stringify(styles.buttun.normal)}>Cancel</label>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}
