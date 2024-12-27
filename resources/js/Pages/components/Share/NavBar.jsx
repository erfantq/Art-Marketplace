import { Link } from "@inertiajs/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoWalletOutline } from "react-icons/io5";
import axios from "axios";
import useToastify from "../../../hooks/useToastify";
export default function Navbar({ username, role }) {

    const showToast = useToastify()
    // useEffect(() => {
    //     // const user = JSON.parse(sessionStorage.getItem('user'));

    //     // // Check if user exists and has username and role properties
    //     // if (user && user.username && user.role) {
    //     //     setUsername(user.username);
    //     //     setRole(user.role);
    //     // }
    //     console.log(username);
    //     console.log(role.toLowerCase());
    // }, [])

    // const createArtwork = async (values, action) => {
    //     try {
    //       const api = axios.create({
    //         baseURL: '/', // Replace with your backend URL
    //         withCredentials: true
    //       });
    //       const response = await api.get("/bidding/add")
    //     //   setArts(response.data.arts)
    //     if (response.status === 200) {
    //         window.location.href = username + "/bidding/add";
    //     }
    //       console.log(response);
    //     } catch (error) {
    //       showToast('error', error.response?.data.message)
    //     }
    //   };


    return (
        <div className="navbar rounded-lg navbar-glass navbar-sticky bg-gray-900 border border-gray-700 shadow-lg shadow-purple-800/50">
            <div className="navbar-start">
                <p className="navbar-item text-white text-xl font-medium">
                    Art Marketpalce
                </p>
            </div>

            <div className="navbar-center">
                <Link href="/" className="navbar-item text-white ">
                    Home
                </Link>
                {username && role.toLowerCase() !== 'artist' && (<Link
                    href={"/" + username + "/walletcharge"}
                    className="navbar-item text-white bg-black flex items-center">
                    <span>Wallet</span>
                    <IoWalletOutline className="flex ml-2" />

                </Link>)}
                <a className="navbar-item text-white">Contact</a>
            </div>

            <div className="navbar-end">
                {!username && (
                    <Link href="/login" className="btn text-white bg-purple-700 ">
                        Login | Register
                    </Link>
                )}
                <p className="navbar-item text-white">
                    {username ? `${role} : ${username}` : ""}
                </p>
                {username && (
                    <div className="avatar avatar-ring avatar-md">
                        <div className="dropdown-container">
                            <div className="dropdown">
                                <label
                                    className="btn btn-ghost flex cursor-pointer px-0"
                                    tabIndex="0"
                                >
                                    <img
                                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                        alt="avatar"
                                    />
                                </label>
                                <div className="dropdown-menu dropdown-menu-bottom-left">
                                    {/* {role.toLowerCase() === 'admin' && (
                                        <Link
                                            href="/inactiveusers"
                                            className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600">
                                            Inactive Users
                                        </Link>)
                                    } */}
                                    <Link
                                        href={role.toLowerCase() === 'user' ? "/user/" + username + "/profile"
                                            : role.toLowerCase() === 'artist' ? "/artist/" + username + "/profile"
                                                : "/admin/" + username + "/profile"}
                                        className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600">
                                        Account setting
                                    </Link>
                                    {role.toLowerCase() === 'artist' && (
                                        <Link
                                            href={username + "/arts/create"}
                                            // onClick={createArtwork}
                                            className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600">
                                            Create Artwork
                                        </Link>)
                                    }
                                    {role.toLowerCase() === 'artist' && (
                                        <Link
                                            href={"/bidding/add"}
                                            className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600">
                                            Create Bidding
                                        </Link>)
                                    }
                                    {role.toLowerCase() === 'artist' && (
                                        <Link
                                            href='/orders'
                                            className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600">
                                            My Seles
                                        </Link>)
                                    }
                                        <Link
                                            href="/logout"
                                            className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600">
                                            Logout
                                        </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
