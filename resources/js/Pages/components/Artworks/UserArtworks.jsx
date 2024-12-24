import React, { useState, useEffect } from "react";
import api from "../../../api/axiosApi";
import ArtworkDrawer from "./ArtworkDrawer";
import { useSession } from '../../../hooks/useSession'; // Adjusted import
export default function UserArtworks({arts}) {
    // const [arts, setArts] = useState([]);
    // const { user, arts: artss } = props;
    // const { arts } = usePage().props;
    // const [arts, setArts] = useState()
    // const navigate = useNavigate();
    const { username } = useSession()

    const [artData, setArtData] = useState([]);

    // useEffect(() => {
    //     sessionStorage.setItem('arts', JSON.stringify(arts))
    //     setArtData(JSON.parse(sessionStorage.getItem('arts')));

    //     // Check if user exists and has username and role properties
    //     if (!artData) {
    //         setArtData(JSON.parse({}))
    //     }
    // }, [])

    return (
        <div className="grid grid-cols-12 gap-6">
            {arts.map((art) => (
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
