import {createContext, useContext, useState} from "react";

const UserContext = createContext(undefined);
const ChangeUserContext = createContext(undefined);

const UserProvider = ({children}) => {
    const [user, setUser] = useState();

    return <ChangeUserContext.Provider value={setUser}>
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    </ChangeUserContext.Provider>
}

export const useUser = () => useContext(UserContext);
export const useSetUser = () => useContext(ChangeUserContext);
export default UserProvider