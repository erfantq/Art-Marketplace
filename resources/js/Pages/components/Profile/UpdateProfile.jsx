import React, { useContext, useState, useEffect } from "react";
import Navbar from "../Share/NavBar";
import { useFormik } from "formik";
import { UpdateProfile } from "../../schemas";
import useToastify from "../../../hooks/useToastify";
export default function UserProfile({ user }) {

    const [btnSubmit, setBtnSubmit] = useState(false);
    const [oldUsername, setOldUsername] = useState('')
    const showToast = useToastify()


    useEffect(() => {
        setOldUsername(user.username)
    }, [])

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
                grid: " w-full btn h-9 px-2 py-2 my-4 rounded-md  ",
                color: " text-sm font-medium text-white bg-purple-700 "
            },
            submitting: {
                grid: " w-full btn h-9 px-2 py-2 my-4 rounded-md  ",
                color: " text-sm font-medium text-white bg-purple-400 cursor-not-allowed "

            }
        }
    }


    const onSubmit = async (values, action) => {
        try {
            const api = axios.create({
                baseURL: '/', // Replace with your backend URL
                withCredentials: true
            });
            const response = await api.post("/" + oldUsername + "/profile/update", values);

            showToast('success', "Update Seccessfully!")
            if (isSubmitting) {
                setBtnSubmit(true);
                setTimeout(() => {
                    if (response.status === 200) {
                        window.location.href = "/" + user.role.toLowerCase() + "/" + user.username + "/profile"
                    }
                    setBtnSubmit(false);
                }, 5000);
            }
        } catch (error) {
            showToast("error", error.response?.data.message)
            console.error(
                "Error submitting form:",
                error.response?.data || error.message
            );
        }
    };

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            address: user.address,
            username: user.username,
            password: "",
        },
        validationSchema: UpdateProfile,
        onSubmit,
    })

    return (
        <div>
            <Navbar username={user.username} role={user.role} />
            <div className="container min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex items-center justify-center">
                <div className="grid grid-cols-12">
                    {/* Information Box */}
                    <div className="col-start-2 col-end-8 container bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 mt-10">
                        {/* Page Heading */}
                        <div className="col-span-5">
                            <p className="text-4xl font-bold text-left text-gray-100 ">
                                Edit Information
                            </p>
                            <h2 className="text-xl font-medium text-left mb-12 text-purple-400">
                                Account of {user.role}
                            </h2>
                        </div>
                        <form className="grid grid-cols-6 gap-4" onSubmit={handleSubmit}>

                            {/* FirstName Field */}
                            <div className="col-span-3">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="first_name"
                                >
                                    FirstName
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    className={
                                        errors.first_name && touched.first_name

                                            ? JSON.stringify(styles.input.inValid)
                                            : JSON.stringify(styles.input.valid)
                                    }
                                    placeholder="Enter your password"
                                    value={values.first_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.first_name && touched.first_name && (
                                    <span className={JSON.stringify(styles.span.error)}>
                                        {errors.first_name}
                                    </span>
                                )}
                            </div>
                            {/* LastName Field */}

                            <div className="col-span-3">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="last_name"
                                >
                                    LastName
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    className={
                                        errors.last_name && touched.last_name

                                            ? JSON.stringify(styles.input.inValid)
                                            : JSON.stringify(styles.input.valid)
                                    }
                                    placeholder="Enter your password"
                                    value={values.last_name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.last_name && touched.last_name && (
                                    <span className={JSON.stringify(styles.span.error)}>
                                        {errors.last_name}
                                    </span>
                                )}
                            </div>

                            {/* Address Field */}
                            <div className="col-span-full">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="address"
                                >
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className={
                                        errors.address && touched.address

                                            ? JSON.stringify(styles.input.inValid)
                                            : JSON.stringify(styles.input.valid)
                                    }
                                    placeholder="Enter your password"
                                    value={values.address}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.address && touched.address && (
                                    <span className={JSON.stringify(styles.span.error)}>
                                        {errors.address}
                                    </span>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="col-span-3">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    className={
                                        errors.email && touched.email

                                            ? JSON.stringify(styles.input.inValid)
                                            : JSON.stringify(styles.input.valid)
                                    }
                                    placeholder="Enter your password"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && touched.email && (
                                    <span className={JSON.stringify(styles.span.error)}>
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Username Field */}
                            <div className="col-span-3">
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

                                            ? JSON.stringify(styles.input.inValid)
                                            : JSON.stringify(styles.input.valid)
                                    }
                                    placeholder="Enter your password"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.username && touched.username && (
                                    <span className={JSON.stringify(styles.span.error)}>
                                        {errors.username}
                                    </span>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="col-span-3">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    type="text"
                                    id="password"
                                    name="password"
                                    className={
                                        errors.password && touched.password

                                            ? JSON.stringify(styles.input.inValid)
                                            : JSON.stringify(styles.input.valid)
                                    }
                                    placeholder="Enter your password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.password && touched.password && (
                                    <span className={JSON.stringify(styles.span.error)}>
                                        {errors.password}
                                    </span>
                                )}
                            </div>

                            <div className="col-span-full">
                                <button
                                    type="submit"
                                    className={btnSubmit
                                        ? JSON.stringify(styles.buttun.submitting)
                                        : JSON.stringify(styles.buttun.normal)}
                                >
                                    {btnSubmit ? "Updating..." : "Edit Profile"}

                                </button>
                            </div>
                        </form>
                    </div>
                    {/* here */}
                </div>
            </div>
        </div>
    );
}
