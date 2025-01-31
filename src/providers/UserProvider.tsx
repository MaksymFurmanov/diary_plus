import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { User } from "../types";

type UserContextType = {
    user: User | undefined;
    setUser: Dispatch<SetStateAction<User | undefined>>;
} | undefined;

const UserContext = createContext<UserContextType>(undefined);

const getUserCookies = (): User | undefined => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) as User : undefined;
};

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(getUserCookies);

    useEffect(() => {
        if (user !== undefined) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("User context is not found");
    }
    return context;
};export default UserProvider;