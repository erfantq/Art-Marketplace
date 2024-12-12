import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import Navbar from "../NavBar";
import { useFormik } from "formik";
import { WalletChargeSchema } from "../../schemas";
import api from "../../../api/axiosApi";

export default function WalletCharge() {
    const { username, role, changeUser } = useContext(UserContext);
    const navigate = useNavigate()

    useEffect(function () {
        if (username === undefined) {
            navigate("/home");
        }
    }, []);

    const onSubmit = async (values, action) => {
        try {
            const response = await api.post(
                "/" + username + "/walletcharge",
                values,
                {
                    headers: {
                        Accept: "application/json",
                    },
                    withCredentials: true, // Important for sending/receiving cookies
                }
            );

            // setBtnSubmit(true);
            setTimeout(() => {
                // setBtnSubmit(false);
                // navigate('/home')
            }, 4000);
            console.log(response.data);
        } catch (error) {
            console.error(
                "Error submitting form:",
                error.response?.data || error.message
            );
        }
    };

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
            <Navbar />
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
                                    Account of {role}
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
                                    <button
                                        type="submit"
                                        // onClick={() => navigate('/edit-profile')}
                                        className="col-start-2 col-end-4 h-9 px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md"
                                    >
                                        Charge
                                    </button>
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
