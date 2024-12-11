import { createContext, useReducer } from "react";

export const UserContext = createContext();

const UserReducer = (state, action) => {
    return {
        ...state,
        username: action.payload.username,
        role: action.payload.role,
    };
};

export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(UserReducer, {
        username: "",
        role: "",
    });

    const changeUser = (username, role) => {
        dispatch({ payload: { username, role } });
    };
    return (
        <UserContext.Provider value={{ ...state, changeUser }}>
            {children}
        </UserContext.Provider>
    );
}
