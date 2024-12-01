import React, { useState, useRef } from "react";
import { LoginSchema } from "../schemas/index";
import { useFormik } from 'formik'

// data :
    // username 
    // password

export default function Login  (props)  {
    

    const formRef = useRef(null);

    const onSubmit = (e) => {
        console.log(values.username)
        // e.preventDefault();
        // console.log(e.target.value)
        formRef.current.submit(); // Programmatically submit the form
      };


    // const onSubmit = (e) => {
    //     if(isSubmitting){
    //     e.preventDefault()
    //     formRef.current.submit() 
    //     }// Programmatically submit the form
    //   };

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            // This function will be called when the form is submitted
            console.log('Form values:', values);
            // You can handle the form submission here, e.g., make an API call
        },
    })

    const baseInput = "w-full px-4 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"

    const incorrectInput = "w-full px-4 py-2 text-sm bg-gray-800 border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                <form ref={formRef} method="post" action="login" onSubmit={handleSubmit}>
                    {/* Username Field */}
                    <div className="mb-6">

                        <label
                            className="block mb-2 text-sm font-medium text-gray-400"
                            htmlFor="username">
                            Username
                        </label>
                        <input type="text"
                            id='username'
                            className={errors.username && touched.username ? incorrectInput : baseInput}
                            placeholder="Enter your username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {errors.username && touched.username && <span className="form-label-alt text-right text-red-500">{errors.username}</span>}
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">

                        <label
                            className="block mb-2 text-sm font-medium text-gray-400"
                            htmlFor="password">
                            Password
                        </label>
                        <input type='password'
                            id='password'
                            className={errors.password && touched.password ? incorrectInput : baseInput}
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                        {errors.password && touched.password && <span className="form-label-alt text-right text-red-500">{errors.password}</span>}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
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
                    <a
                        href="/register" // Navigate to /register
                        className="mt-2 text-sm font-medium text-purple-400 hover:underline"
                    >
                        Sign Up Here
                    </a>
                </div>
            </div>
        </div>
    );

};
