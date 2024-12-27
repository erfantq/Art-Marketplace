import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import { useFormik } from "formik";
import { WalletChargeSchema } from "../../schemas";
import api from "../../../api/axiosApi";
import useToastify from "../../../hooks/useToastify";
import axios from 'axios';

export default function WalletCharge({ user }) {

    // const [user, setUser] = useState({})
    const showToast = useToastify()
    const [btnSubmit, setBtnSubmit] = useState(false);

    const styles = {
        input: {
            valid: {
                grid: " w-full h-9 px-2 py-1 rounded-md ",
                color: " text-sm bg-gray-800 border border-gray-700 ",
                focus: " focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 "
            },
            inValid: {
                grid: " w-full h-9 px-2 py-1 rounded-md ",
                color: " text-sm bg-gray-800 border border-red-700 text-gray-300 ",
                focus: " focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-red-500 "
            }
        },
        div: {
            transition: " transform transition-colors duration-500 ",
            grid: " w-full h-9 px-2 py-2 rounded-md ",
            color: " text-sm bg-gray-800 border-l-2 border-gray-700 hover:border-purple-600 text-gray-300 "
        },
        buttun: {
            normal: {
                grid: "  w-full btn h-9 px-2 py-2 my-4 rounded-md  ",
                color: " text-sm font-medium text-white bg-purple-700 "
            },
            submitting: {
                grid: "  w-full btn h-9 px-2 py-2 my-4 rounded-md  ",
                color: " text-sm font-medium text-white bg-purple-400 cursor-not-allowed "

            }
        },
        span: {
            error: " form-label-alt block text-red-500 text-md "
        },
        textarea: {
            valid: {
                grid: " bg-gray-800 w-full rounded-md ",
                color: " w-full p-3 text-gray-400 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 "
            },
            inValid: {
                grid: " bg-gray-800 w-full rounded-md ",
                color: " w-full p-3 text-gray-600 border-2 border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 "
            }
        }
    }


    // useEffect(() => {
    //     setUser(JSON.parse(sessionStorage.getItem('user')));

    //     // Check if user exists and has username and role properties
    //     if (!user) {
    //         setUser(JSON.parse({}))
    //     }
    // }, [])

    const onSubmit = async (values, action) => {
        try {
            const api = axios.create({
                baseURL: '/', // Replace with your backend URL
                withCredentials: true, // Enable cookies
            });
            const response = await api.post("/" + user.username + "/walletcharge", values);
            console.log(response);

            // setBtnSubmit(true);
            showToast('success', "Update Seccessfully!")
            setBtnSubmit(true)
            setTimeout(() => {
                setBtnSubmit(false);
                if (response.status === 200) {
                    window.location.href = "/"
                }

            }, 4000);
            console.log(response.data);
        } catch (error) {
            showToast("error", error.response?.data.message)
            console.error(
                "Error submitting form:",
                error.response?.data || error.message
            );
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
            charge: "",
        },
        validationSchema: WalletChargeSchema,
        onSubmit,
    });

    const baseInput =
        "mb-6 col-span-4 px-1 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500";

    const incorrectInput =
        "col-span-4 px-4 py-2 text-sm bg-gray-800 border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500";

    return (
        <div>
            <Navbar username={user.username} role={user.role} />
            <div className="container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex items-center justify-center">
                <div className="grid grid-cols-9">
                    {/* Information Box */}
                    <div className="col-start-4 col-end-7 container bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 mt-10">
                        {/* Page Heading */}
                        <div className="grid grid-cols-6">
                            {/* <div className='col-span-2'> */}
                            <div className="col-span-6">
                                <p className="text-4xl font-bold text-center text-gray-100 ">
                                    Recharge Wallet
                                </p>
                                <h2 className="text-xl font-medium text-center mb-12 text-purple-400">
                                    Account of {user.role}
                                </h2>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="col-span-6 container"
                            >
                                <div className="grid grid-cols-4">
                                    <label
                                        className="col-span-4 mb-2 text-sm font-medium text-gray-400"
                                        htmlFor="charge"
                                    >
                                        Amount of charge
                                    </label>
                                    <input
                                        type="number"
                                        min="100"
                                        step="100"
                                        id="charge"
                                        name="charge"
                                        className={
                                            errors.charge && touched.charge
                                                ? incorrectInput
                                                : baseInput
                                        }
                                        value={values.charge}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.charge && touched.charge && (
                                        <span className="text-red-500 text-xs col-span-4 mb-4 mt-1">
                                            {errors.charge}
                                        </span>
                                    )}
                                    <div className="col-span-full">
                                        <button
                                            type="submit"
                                        // onClick={() => navigate('/edit-profile')}
                                            className={btnSubmit
                                                ? JSON.stringify(styles.buttun.submitting)
                                                : JSON.stringify(styles.buttun.normal)}
                                        >
                                            {btnSubmit ? "Charging..." : "Charge"}
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Edit Profile Button */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}