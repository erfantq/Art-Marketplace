import React, { useEffect, useState } from "react";
import Navbar from "../Share/NavBar";
import { useFormik } from "formik";
import { WalletChargeSchema } from "../../schemas";
import api from "../../../api/axiosApi";
import { Navigate, useNavigate } from "react-router-dom";

export default function CreateBiddingg() {
    const navigate = useNavigate("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [login, setLogin] = useState(false);

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
            artwork: "",
        },
        validationSchema: WalletChargeSchema,
        onSubmit,
    });

    const baseInput =
        "w-full px-1 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500";

    const incorrectInput =
        "max-w-full px-4 py-2 text-sm bg-gray-800 border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500";

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
                                    Create Biddingg
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="col-span-6 container"
                            >
                                <div className="grid grid-cols-4">
                                    <div className="my-4 col-span-4">
                                        <label
                                            htmlFor="artwork"
                                            className="block text-sm font-medium text-gray-400"
                                        >
                                            Artwork
                                        </label>
                                        <select
                                            id="artwork"
                                            name="artwork"
                                            value={values.artwork}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={
                                                errors.artwork &&
                                                touched.artwork
                                                    ? incorrectInput
                                                    : baseInput
                                            }
                                        >
                                            <option value="" disabled>
                                                Select your artwork
                                            </option>
                                            <option value="Artist">
                                                Artist
                                            </option>
                                            <option value="User">
                                                Normal User
                                            </option>
                                        </select>

                                        {errors.role && touched.role && (
                                            <span className="text-red-500 text-xs">
                                                {errors.role}
                                            </span>
                                        )}
                                    </div>
                                    <div className="my-4 col-span-4">
                                        <label
                                            className="block text-sm font-medium text-gray-400"
                                            htmlFor="charge"
                                        >
                                            Basic Price
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
                                    </div>
                                    <button
                                        type="submit"
                                        // onClick={() => navigate('/edit-profile')}
                                        className="col-start-2 col-end-4 h-9 px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md"
                                    >
                                        Create
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
