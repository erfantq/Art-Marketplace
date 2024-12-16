import { useEffect, useState } from "react";

export const useSession = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        setUsername(sessionStorage.getItem("username"));
        setRole(sessionStorage.getItem("role"));
    }, [])

    return { username, role };
}
