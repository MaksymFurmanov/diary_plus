import {createContext, useContext, useState} from "react";
import employeesData from "../data/employees";

const EmployeesContext = createContext(undefined);
const SetEmployeesContext = createContext(undefined);

const EmployeesProvider = ({children}) => {
    const [employees, setEmployees] = useState(employeesData);

    return <SetEmployeesContext.Provider value={setEmployees}>
        <EmployeesContext.Provider value={employees}>
            {children}
        </EmployeesContext.Provider>
    </SetEmployeesContext.Provider>
}

export const useEmployees = () => useContext(EmployeesContext);
export const useSetEmployees = () => useContext(SetEmployeesContext);

export default EmployeesProvider