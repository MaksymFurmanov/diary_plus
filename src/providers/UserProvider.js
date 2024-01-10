import {createContext, useContext, useEffect, useState} from "react";
import employees from "../data/employees";

const UserContext = createContext(undefined);
const ChangeUserContext = createContext(undefined);

const UserProvider = ({children}) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(employees.find((employee) =>
            employee.employee_id === 0))
    }, [])

    return <ChangeUserContext.Provider value={setUser}>
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    </ChangeUserContext.Provider>
}

export const useUser = () => useContext(UserContext);
export const useSetUser = () => useContext(ChangeUserContext);
export default UserProvider