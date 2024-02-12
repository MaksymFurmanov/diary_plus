import {createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext(undefined);
const ChangeUserContext = createContext(undefined);

const UserProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    return (
        <ChangeUserContext.Provider value={setUser}>
            <UserContext.Provider value={user}>
                {children}
            </UserContext.Provider>
        </ChangeUserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
export const useSetUser = () => useContext(ChangeUserContext);
export default UserProvider