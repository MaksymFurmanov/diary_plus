import {createContext, useContext} from "react";
import useReadData from "../hooks/useReadData";

const EmployeesContext = createContext(undefined);
const SetEmployeesContext = createContext(undefined);

const EmployeesProvider = ({children}) => {
    const [employees, setEmployees, loading] = useReadData("employees");

    return (
        <SetEmployeesContext.Provider value={setEmployees}>
            <EmployeesContext.Provider value={employees}>
                {loading ? <p>Loading...</p>: children}
            </EmployeesContext.Provider>
        </SetEmployeesContext.Provider>
    );
};

export const useEmployees = () => useContext(EmployeesContext);
export const useSetEmployees = () => useContext(SetEmployeesContext);

export default EmployeesProvider;
