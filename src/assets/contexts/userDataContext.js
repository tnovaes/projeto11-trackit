import { createContext, useState } from 'react';

export const UserDataContext = createContext("");

export const UserDataProvider = ({children}) => {
    const [token, setToken] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [habits, setHabits] = useState([]);
    const [completedHabits, setCompletedHabits] = useState([]);
    const [todayHabits, setTodayHabits] = useState([]);

    return (
        <UserDataContext.Provider 
        value={{token, setToken, profilePic, setProfilePic, habits, setHabits, completedHabits, setCompletedHabits, todayHabits, setTodayHabits}}>
            {children}
        </UserDataContext.Provider>
    );
};
 