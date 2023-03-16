import { createContext, useState } from 'react';

export const UserDataContext = createContext("");

export const UserDataProvider = ({children}) => {
    const [token, setToken] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);
    const [profilePic, setProfilePic] = useState("");
    const [habits, setHabits] = useState([]);

    return (
        <UserDataContext.Provider value={{token, setToken, loginStatus, setLoginStatus, profilePic, setProfilePic, habits, setHabits}}>
            {children}
        </UserDataContext.Provider>
    );
};
 