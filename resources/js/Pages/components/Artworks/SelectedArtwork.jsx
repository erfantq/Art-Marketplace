import React, { useContext, useState, useEffect } from "react";
import Navbar from "../NavBar";
import { useSession } from "../../../hooks/useSession";
import { usePage } from "@inertiajs/react";

export default function SelectedArtwork() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const { username, role } = useSession()
    const { art } = usePage().props;

    const divStyles = "w-full h-9 px-1 py-2 text-sm bg-gray-800 border-left border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
    const styles = {
        div: {
            transition: " transform transition-colors duration-500 ",
            grid: " w-full h-9 px-2 py-2 rounded-md ",
            color: " text-sm bg-gray-800 border-l-2 border-gray-700 hover:border-purple-600 text-gray-300 "
        },
        buttun: {
            grid: "w-full btn h-9 px-2 py-2 my-4 rounded-md  ",
            color: "text-sm font-medium text-white bg-purple-700 "
        }
    }

    useEffect(()=>{
        console.log(art);
    },[])
    const baseInput =
        "w-full px-1 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500";

    const incorrectInput =
        "max-w-full px-4 py-2 text-sm bg-gray-800 border border-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500";

    return (
        <div>
            <Navbar />
           
        </div>
    );
}
