import React, { useState, useEffect } from "react";
import api from '../../../api/axiosApi'
export default function Artworks() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");

    const fetchData = async () => {
        try {
            const response = await api.get("/home");
            console.log(response);
        } catch (error) {
            setError("Error fetching data: " + error.message);
        }
    };

    // Call fetchData on component mount
    useEffect(() => {
        setUsername(sessionStorage.getItem("username"));
        setRole(sessionStorage.getItem("role"));
        fetchData();
    }, []);

    return <div>alsjdahsdkh</div>;
}
