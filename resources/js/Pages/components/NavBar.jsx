import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Navbar() {
    const { username, role, changeUser } = useContext(UserContext);
    const navigate = useNavigate("");
    // const [username, setUsername] = useState("");
    // const [role, setRole] = useState("");
    const [login, setLogin] = useState(false);

    useEffect(function () {
        if (username === undefined) {
            navigate("/home");
        }
    }, []);

    return (
        <div className="navbar rounded-lg navbar-glass  navbar-active navbar-sticky bg-gray-900 border border-gray-700">
            <div className="navbar-start">
                <a className="navbar-item text-white text-xl font-medium">
                    Art Marketpalce
                </a>
            </div>

            <div className="navbar-center">
                <a className="navbar-item text-white">Home</a>
                <button
                    className="navbar-item text-white"
                    onClick={() => navigate("/home")}
                >
                    Artworks
                </button>
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
                                        className="dropdown-item text-sm text-gray-900"
                                        onClick={() => navigate("/" + username)}
                                    >
                                        Account setting
                                    </button>
                                    <button
                                        className="dropdown-item text-sm text-gray-900"
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
                                    <a
                                        tabIndex="-1"
                                        className="dropdown-item text-sm text-gray-900"
                                    >
                                        Artworks
                                    </a>
                                    <button
                                        tabIndex="-1"
                                        className="dropdown-item text-sm text-gray-900"
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
                                        className="dropdown-item text-sm text-gray-900"
                                        onClick={() => {
                                            setLogin(false);
                                            changeUser("", "");
                                            navigate("/login");
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
