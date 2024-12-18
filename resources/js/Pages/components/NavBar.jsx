import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate("");
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('')


    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
    
        // Check if user exists and has username and role properties
        if (user && user.username && user.role) {
            setUsername(user.username);
            setRole(user.role);
        }
    }, [])


    return (
        <div className="navbar rounded-lg navbar-glass navbar-sticky bg-gray-900 border border-gray-700">
            <div className="navbar-start">
                <a className="navbar-item text-white text-xl font-medium">
                    Art Marketpalce
                </a>
            </div>

            <div className="navbar-center">
                <button className="navbar-item text-white"
                    onClick={() => navigate('/home')}>Home</button>
                {/* { <button
                    className="navbar-item text-white"
                    onClick={() => navigate("/home/arts")}
                >
                    Artworks
                </button> } */}
                <a className="navbar-item text-white">Contact</a>
            </div>

            <div className="navbar-end">
                {!username && (
                    <button
                        className="btn text-white bg-purple-700 "
                        onClick={() => navigate("/login")}
                    >
                        Login | Register
                    </button>
                )}
                <a className="navbar-item text-white">
                    {username ? `${role} : ${username}` : ""}
                </a>
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
                                    <button
                                        className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600"
                                        onClick={() => {
                                            if (role === "User") {
                                                navigate("/user/" + username + "/profile")
                                            } else if (role == 'Artist') {
                                                navigate("/artist/" + username + "/profile")
                                            }

                                        }}
                                    >
                                        Account setting
                                    </button>
                                    <button
                                        className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600"
                                        onClick={() =>
                                            navigate(
                                                "/" +
                                                username +
                                                "/createArtwork"
                                            )
                                        }
                                    >
                                        Create Artwork
                                    </button>
                                    <button
                                        className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600"
                                        onClick={() => {
                                            console.log(
                                                "/" +
                                                username +
                                                "/createBiddingg"
                                            );
                                            navigate(
                                                "/" +
                                                username +
                                                "/createBiddingg"
                                            );
                                        }}
                                    >
                                        Create Bidding
                                    </button>
                                    <a
                                        tabIndex="-1"
                                        className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600"
                                    >
                                        Artworks
                                    </a>
                                    <button
                                        tabIndex="-1"
                                        className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600"
                                        onClick={() =>
                                            navigate(
                                                "/" + username + "/walletcharge"
                                            )
                                        }
                                    >
                                        Charge Wallet
                                    </button>
                                    <button
                                        tabIndex="-1"
                                        className="dropdown-item text-sm text-gray-900 hover:border-l-2 hover:border-purple-600"
                                        onClick={() => {
                                            setLogin(false);
                                            navigate("/login");
                                            sessionStorage.setItem('user', JSON.stringify({}))
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
