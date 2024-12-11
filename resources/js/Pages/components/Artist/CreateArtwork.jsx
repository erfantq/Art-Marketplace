import React, { useContext, useState, useEffect } from "react";
import Navbar from "../NavBar";
import { UserContext } from "../../../context/UserContext";
import { useFormik } from "formik";
import { CreateArtworkSchema } from "../../schemas";

export default function CreateArtwork() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const { username, role, changeUser } = useContext(UserContext);

    const onSubmit = async (values, action) => {
        try {
            const response = await api.post(
                "/" + username + "/createArtwork",
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
            name: "",
            number: "",
            price: "",
            description: "",
            img:""
        },
        validationSchema: CreateArtworkSchema,
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
                <div className="grid grid-cols-12">
                    {/* Information Box */}
                    <div className="col-span-12 container bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 mt-10">
                        {/* Page Heading */}
                        <div className="grid grid-cols-6 gap-3">
                            {/* <div className='col-span-2'> */}
                            <div className="col-span-6">
                                <p className="text-4xl font-bold text-center text-gray-100 ">
                                    Create an Artwork
                                </p>
                            </div>

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
                                    className={` ${baseInput}`}
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
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
                                    min="1"
                                    className={` ${baseInput}`}
                                    value={values.number}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
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
                                    className={` ${baseInput}`}
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>
                            <div className="mb-6 col-span-6 ">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    className={` ${baseInput}`}
                                    value={values.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
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
                                    className={`input-file text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500   file:bg-purple-600  file:text-white`}
                                    value={values.img}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </div>

                            {/* Edit Profile Button */}
                            <button
                                type="submit"
                                // onClick={() => navigate('/edit-profile')}
                                className="col-start-3 col-end-5  h-9 px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md"
                            >
                                Create Artwork
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
