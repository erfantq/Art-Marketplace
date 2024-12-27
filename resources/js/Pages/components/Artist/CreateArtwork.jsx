import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Share/NavBar";
import { UserContext } from "../../../context/UserContext";
import { useFormik } from "formik";
import { CreateArtworkSchema } from "../../schemas";
import useToastify from "../../../hooks/useToastify";

export default function CreateArtwork({ username }) {
    const [btnSubmit, setBtnSubmit] = useState(false)
    const showToast = useToastify()
    const onSubmit = async (values, action) => {
        try {
            const api = axios.create({
                baseURL: '/', // Replace with your backend URL
                withCredentials: true, // Enable cookies
            });
            const response = await api.post(username+"/arts", values);
            showToast('success', "Succussfully Creating Artwork !!");
            if (isSubmitting) {
                setBtnSubmit(true);
                setTimeout(() => {
                    setBtnSubmit(false);
                    if (response.status === 200) {
                        window.location.href = '/';
                    }
                }, 5000);
            }
        } catch (error) {
            showToast('error', error.response?.data.message);
            console.error("Error submitting form:", error.response?.data || error.message);
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
            name: "",
            number: "",
            price: "",
            description: "",
            img: ""
        },
        validationSchema: CreateArtworkSchema,
        onSubmit,
    });

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

        span: {
            error: " form-label-alt block text-red-500 "
        },
        div: {
            transition: " transform transition-colors duration-500 ",
            grid: " w-full h-9 px-2 py-2 rounded-md ",
            color: " text-sm bg-gray-800 border-l-2 border-gray-700 hover:border-purple-600 text-gray-300 "
        },
        buttun: {
            normal: {
                grid: " w-full btn h-9 px-2 py-2 my-4 rounded-md col-span-4",
                color: " text-sm font-medium text-white bg-purple-700 "
            },
            submitting: {
                grid: " w-full btn h-9 px-2 py-2 my-4 rounded-md  ",
                color: " text-sm font-medium text-white bg-purple-400 cursor-not-allowed "

            }
        }
    }


    const baseInput =
        "w-full px-1 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500";

    const incorrectInput =
        "max-w-full px-4 py-2 text-sm bg-gray-800 border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500";

    return (
        <div>
            <Navbar username={username} role="Artist" />
            <div className="container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex items-center justify-center">
                <div className="grid grid-cols-12">
                    {/* Information Box */}
                    <div className="col-span-12 container bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 mt-10">
                        {/* Page Heading */}
                        <div className="">
                            {/* <div className='col-span-2'> */}
                            <div className="col-span-6">
                                <p className="text-4xl font-bold text-center text-gray-100 ">
                                    Create an Artwork
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-3">
                                <div className="mb-6 col-span-6 mt-6">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-400"
                                        htmlFor="name"
                                    >
                                        Name of artwork
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={
                                            errors.name && touched.name
                                                ? JSON.stringify(styles.input.inValid)
                                                : JSON.stringify(styles.input.valid)
                                        }
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.name && touched.name && (
                                        <span className={JSON.stringify(styles.span.error)}>
                                            {errors.name}
                                        </span>
                                    )}
                                </div>

                                {/* Account Info Display */}
                                <div className="mb-6 col-span-3">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-400"
                                        htmlFor="number"
                                    >
                                        Number of artwork
                                    </label>
                                    <input
                                        type="number"
                                        id="number"
                                        name="number"
                                        min={1}
                                        className={
                                            errors.number && touched.number
                                                ? JSON.stringify(styles.input.inValid)
                                                : JSON.stringify(styles.input.valid)
                                        }
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
                                <div className="mb-6 col-span-3 ">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-400"
                                        htmlFor="price"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        min="0"
                                        step="100"
                                        className={
                                            errors.price && touched.price
                                                ? JSON.stringify(styles.input.inValid)
                                                : JSON.stringify(styles.input.valid)
                                        }
                                        value={values.price}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.price && touched.price && (
                                        <span className={JSON.stringify(styles.span.error)}>
                                            {errors.price}
                                        </span>
                                    )}
                                </div>

                                <div className="mb-6 col-span-6 ">
                                    <label
                                        className="block mb-2 text-sm font-medium text-gray-400"
                                        htmlFor="image"
                                    >
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="img"
                                        className={
                                            errors.img && touched.img
                                                ? JSON.stringify(styles.input.inValid)
                                                : JSON.stringify(styles.input.valid) + 'input-file file:bg-purple-600  file:text-white rounded-md focus:ring-2'
                                        }
                                        // className={`input-file text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500   file:bg-purple-600  file:text-white`}
                                        value={values.img}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    {errors.img && touched.img && (
                                        <span className={JSON.stringify(styles.span.error)}>
                                            {errors.img}
                                        </span>
                                    )}
                                </div>
                                <div className="col-span-full">
                                    {/* Edit Profile Button */}
                                    <button
                                        type="submit"
                                        className={btnSubmit
                                            ? JSON.stringify(styles.buttun.submitting)
                                            : JSON.stringify(styles.buttun.normal)}
                                    >
                                        {btnSubmit ? "Creating..." : "Create Artwork"}
                                        {btnSubmit && (<div className="ml-2 spinner-dot-pulse spinner-sm [--spinner-color:var(--gray-2)]">
                                            <div className="spinner-pulse-dot"></div>
                                        </div>)}

                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
