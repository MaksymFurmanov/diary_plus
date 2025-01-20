import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {User} from "../types";

const UserContext = createContext<User | undefined>(undefined);
const ChangeUserContext =
    createContext<Dispatch<SetStateAction<User | undefined>> | undefined>(undefined);

const getUserCookies = () => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : undefined;
}

const UserProvider = ({children}: {
    children: ReactNode
}) => {
    const [user, setUser] = useState<User | undefined>(getUserCookies);

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