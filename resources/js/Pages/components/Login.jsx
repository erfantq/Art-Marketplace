import React, { useState } from "react";
import { LoginSchema } from "../schemas/index";
import { Formik, useFormik } from "formik";
import useToastify from "../../hooks/useToastify";
import { Link } from "@inertiajs/react";
import axios from 'axios';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
export default function Login() {
    const showToast = useToastify(); // Get the toast function
    const [btnSubmit, setBtnSubmit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // const styles = {
    //     icon
    // }

    const onSubmit = async (values, action) => {
        try {
            const api = axios.create({
                baseURL: '/', // Replace with your backend URL
                withCredentials: true, // Enable cookies
            });
            const response = await api.post("/login", values);
            showToast('success', "Welcome !!");
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
            username: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit,
    });

    const baseInput =
        "w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500";
    const incorrectInput =
        "w-full px-4 py-2 text-sm bg-gray-800 border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500";

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
                {/* Page Heading */}
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-100 font-serif">
                    Art Marketplace
                </h1>
                <h2 className="text-xl font-medium text-center mb-8 text-purple-400">
                    Login to Your Account
                </h2>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {/* Username Field */}
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-400" htmlFor="username">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={errors.username && touched.username ? incorrectInput : baseInput}
                            placeholder="Enter your username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.username && touched.username && (
                            <span className="form-label-alt text-right text-red-500">
                                {errors.username}
                            </span>
                        )}
                    </div>

                    {/* Password Field */}
                    <label className="block mb-2 text-sm font-medium text-gray-400" htmlFor="password">
                            Password
                        </label>
                    <div className="mb-1 relative">
                        <input
                            type={showPassword ? "text" : "password"} // Toggle between text and password
                            id="password"
                            name="password"
                            className={errors.password && touched.password ? incorrectInput : baseInput}
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <span
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                        >
                            {showPassword ? <FaRegEye className="text-gray-400" />
                                : <FaRegEyeSlash className="text-gray-400" />} {/* Show eye icon */}
                        </span>
                    </div>
                        {errors.password && touched.password && (
                        <span className="form-label-alt text-right text-red-500 mb-2">
                                {errors.password}
                            </span>
                    )}

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={btnSubmit}
                        className={`w-full px-4 py-2 mt-6 text-sm font-medium text-white rounded-md  ${btnSubmit
                            ? "bg-purple-400 cursor-not-allowed"
                            : "bg-purple-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            }`}
                    >
                        {btnSubmit ? "Welcome..." : "Login"}
                    </button>
                </form>

                {/* Redirect to Signup */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">Don't have an account?</p>
                    <Link href="/register" className="mt-2 text-sm font-medium text-purple-400 hover:underline cursor-pointer">
                        Sign Up Here
                    </Link>
                </div>
            </div>
        </div>
    );
}
