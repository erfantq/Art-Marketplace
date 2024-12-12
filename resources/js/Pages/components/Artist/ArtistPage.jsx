import React, { useContext, useState, useEffect } from "react";
import Navbar from "../NavBar";
import { UserContext } from "../../../context/UserContext";

export default function ArtistPage() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const { username, role, changeUser } = useContext(UserContext);

    const fetchData = async () => {
        try {
            const response = await api.get(username + "/arts");
            console.log(response);
        } catch (error) {
            setError("Error fetching data: " + error.message);
        }
    };

    // Call fetchData on component mount
    useEffect(() => {
        fetchData();
    }, []);

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
                    <div className="col-start-2 col-end-8 container bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 mt-10">
                        {/* Page Heading */}
                        <div className="grid grid-cols-6 gap-4">
                            {/* <div className='col-span-2'> */}
                            <div className="col-span-5">
                                <p className="text-4xl font-bold text-left text-gray-100 ">
                                    Information of account
                                </p>
                                <h2 className="text-xl font-medium text-left mb-12 text-purple-400">
                                    Account of artist
                                </h2>
                            </div>

                            <div className="col-span-3 ">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="firstName"
                                >
                                    FirstName
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className={` ${baseInput}`}
                                />
                            </div>

                            {/* Account Info Display */}
                            <div className="col-start-4 col-end-7">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="lastName"
                                >
                                    LastName
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className={` ${baseInput}`}
                                />
                            </div>
                            <div className="col-span-full ">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="address"
                                >
                                    Address
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="address"
                                    name="address"
                                    className={` ${baseInput}`}
                                />
                            </div>
                            <div className="col-span-3 ">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    disabled
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={` ${baseInput}`}
                                />
                            </div>
                            <div className="col-span-3 ">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="username"
                                >
                                    Username
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="username"
                                    name="username"
                                    className={` ${baseInput}`}
                                />
                            </div>

                            <div className="col-span-3">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="password"
                                    name="password"
                                    className={` ${baseInput}`}
                                />
                            </div>
                            <div className="col-span-3 ">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-400"
                                    htmlFor="confirmPass"
                                >
                                    ConfirmPassword
                                </label>
                                <input
                                    disabled
                                    type="text"
                                    id="confirmPass"
                                    name="confirmPass"
                                    className={` ${baseInput}`}
                                />
                            </div>

                            {/* Edit Profile Button */}
                            <button
                                // onClick={() => navigate('/edit-profile')}
                                className="col-span-2 h-9 px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md"
                            >
                                Edit Profile
                            </button>
                            <button
                                type="submit"
                                // onClick={() => navigate('/edit-profile')}
                                className="col-span-2 invisible h-9 px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    {/* Pay */}
                    <div className="col-span-3 container mx-5 mt-10 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8">
                        {/* Page Heading */}
                        <p className="text-xl text-left font-bold mb-1 text-gray-100 ">
                            Profile image
                        </p>
                        <p className="text-xs text-left mb-8 text-gray-100 ">
                            Change profile image
                        </p>
                        <img
                            className="hover:opacity-30"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                            alt="avatar"
                        />

                        {/* Edit Profile Button */}
                        <button
                            // onClick={() => navigate('/edit-profile')}
                            className="w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md"
                        >
                            Edit Image
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
