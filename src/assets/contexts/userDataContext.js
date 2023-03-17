import { createContext, useState } from 'react';

export const UserDataContext = createContext("");

export const UserDataProvider = ({children}) => {
    const [token, setToken] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [habits, setHabits] = useState([]);
    const [completedHabits, setCompletedHabits] = useState([]);
    const [todayHabits, setTodayHabits] = useState([]);
    const [percentage, setPercentage] = useState(0);

    return (
        <UserDataContext.Provider 
        value={{token, setToken, profilePic, setProfilePic, habits, setHabits, completedHabits, setCompletedHabits, todayHabits, setTodayHabits, percentage, setPercentage}}>
            {children}
        </UserDataContext.Provider>
    );
};
 