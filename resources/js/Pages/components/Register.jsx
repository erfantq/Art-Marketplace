import React, { useState, useRef,useEffect } from "react";
import { RegisterSchema } from "../schemas";
import { Formik, useFormik } from "formik";
import axios from 'axios';
import { data, useNavigate } from "react-router-dom";
import api from "../../api/axiosApi";

export default function Register(props) {
    // const [csrfToken, setCsrfToken] = useState("");
    const navigate = useNavigate();

    const [btnSubmit, setBtnSubmit] = useState(false);

    const onSubmit = async (values, action) => {
        try {
            const response = await api.post("/register", values, {
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true, // Important for sending/receiving cookies
            });
            
            sessionStorage.setItem("username", response.data.user.username);
            sessionStorage.setItem("role", response.data.user.role);

            setBtnSubmit(true);
            setTimeout(() => {
                setBtnSubmit(false);
                navigate("/home");
            }, 4000);
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
            username: "",
            password: "",
            role: "",
        },
        validationSchema: RegisterSchema,
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

                {/* Signup Form */}
                <form onSubmit={handleSubmit}>
                    <h4 className="text-xl font-medium text-center mb-8 text-purple-400">
                        Create an account
                    </h4>
                    {/* Username Field */}
                    <div className="mb-6">
                        <label
                            htmlFor="username"
                            className="block mb-2 text-sm font-medium text-gray-400"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={values.username}
                            placeholder="Enter your username"
                            className={
                                errors.username && touched.username
                                    ? incorrectInput
                                    : baseInput
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.username && touched.username && (
                            <span className="text-red-500 text-xs">
                                {errors.username}
                            </span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-400"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.password && touched.password
                                    ? incorrectInput
                                    : baseInput
                            }
                            placeholder="Enter your password"
                        />

                        {errors.password && touched.password && (
                            <span className="text-red-500 text-xs">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {/* Role Selection */}
                    <div className="mb-6">
                        <label
                            htmlFor="role"
                            className="block mb-2 text-sm font-medium text-gray-400"
                        >
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={
                                errors.role && touched.role
                                    ? incorrectInput
                                    : baseInput
                            }
                        >
                            <option value="" disabled>
                                Select your role
                            </option>
                            <option value="Artist">Artist</option>
                            <option value="User">Normal User</option>
                        </select>

                        {errors.role && touched.role && (
                            <span className="text-red-500 text-xs">
                                {errors.role}
                            </span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={btnSubmit}
                        className={`w-full px-4 py-2 text-sm font-medium text-white rounded-md  ${
                            btnSubmit
                                ? "bg-purple-400 cursor-not-allowed"
                                : "bg-purple-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        }`}
                    >
                        {btnSubmit ? "Submitting..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Already have an account?
                    </p>
                    <p
                        onClick={() => navigate("/login")} // Navigate to /register
                        className="mt-2 text-sm font-medium text-purple-400 hover:underline cursor-pointer"
                    >
                        Login Here
                    </p>
                </div>
            </div>
        </div>
    );
}