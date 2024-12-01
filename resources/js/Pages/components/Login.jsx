import React, { useState, useRef } from "react";
import { LoginSchema } from "../schemas/index";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// data :
// username
// password

export default function Login(props) {
    const formRef = useRef();
    const navigate = useNavigate();

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
        onSubmit: async (values, actions) => {
            try {
              const response = await axios.post('/login', values);
              console.log(values)
              console.log(response.data);
              // Handle successful registration here (e.g., show a success message, redirect)
            } catch (error) {
              console.error('Registration error:', error);
              // Handle registration error here (e.g., show an error message)
            }
            actions.setSubmitting(false);
          },
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
                <form
                    ref={formRef}
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }}
                >
                    {/* Username Field */}
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-400"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className={
                                errors.username && touched.username
                                    ? incorrectInput
                                    : baseInput
                            }
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
                    <div className="mb-6">
                        <label
                            className="block mb-2 text-sm font-medium text-gray-400"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className={
                                errors.password && touched.password
                                    ? incorrectInput
                                    : baseInput
                            }
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {errors.password && touched.password && (
                            <span className="form-label-alt text-right text-red-500">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        // type="submit"
                        className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>

                {/* Redirect to Signup */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Don't have an account?
                    </p>
                    <p
                        onClick={() =>navigate('/register')}
                        // href="/register" // Navigate to /register
                        className="mt-2 text-sm font-medium text-purple-400 hover:underline cursor-pointer"
                    >
                        Sign Up Here
                    </p>
                </div>
            </div>
        </div>
    );
}
