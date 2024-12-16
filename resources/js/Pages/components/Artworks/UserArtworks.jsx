import React, { useState, useEffect } from "react";
import api from "../../../api/axiosApi";
import ArtworkDrawer from "./ArtworkDrawer";
import { useNavigate } from "react-router-dom";
import { usePage } from "@inertiajs/react";

export default function UserArtworks() {
    // const [arts, setArts] = useState([]);
    // const { user, arts: artss } = props;
    const { arts } = usePage().props;
    // const [arts, setArts] = useState()
    const navigate = useNavigate();

    const [artData, setArtData] = useState([]);
    useEffect(() => {
        if (arts) {
            setArtData(arts)
        }
    }, [arts])

    return (
        <div className="grid grid-cols-12 gap-6">
            {artData.map((art) => (
                <div
                    key={art.name}
                    className="col-span-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
                >
                    <img
                        src={
                            "https://img.cdn-pictorem.com/uploads/collection/D/DN4DFF8JRC/900_Nature-Art_10.jpg"
                        }
                        alt={art.name}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                        <p className="font-semibold text-2xl">{art.name}</p>
                        <p className="text-purple-400 ">
                            Artist : {art.artist.username}
                        </p>
                        <p className="text-sm text-gray-500 my-2">
                            Quantity : {art.number}
                        </p>
                        <p className="text-xs text-gray-600 my-2">
                            {art.reviews.length} reviews
                        </p>
                        <p className="text-sm text-gray-400 my-2">
                            Price : ${art.price}
                        </p>
                        <label
                            className="btn bg-purple-700 text-white rounded-md"
                            htmlFor={art.name}
                            onClick={() => {
                                navigate('/home/arts/' + art._id.$oid);
                            }}
                        >
                            View Details
                        </label>
                    </div>
                </div>
            ))}
            {/* {selectArt && <ArtworkDrawer selectArt={selectArt} />} */}
        </div>
    );
}
