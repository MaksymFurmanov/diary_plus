import { createContext, useContext, useEffect, useState} from "react";
import { useServer } from "./SereverProvider";

const EmployeesContext = createContext(undefined);
const SetEmployeesContext = createContext(undefined);

const EmployeesProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const api = useServer();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(
                    `${api}/employees/get-employees`
                );
                if (response.ok) {
                    const data = await response.json();
                    setEmployees(data);
                } else {
                    console.log("No employees found");
                }
            } catch (e) {
                console.error("Error fetching employees:",
                    `${api}/employees/get-employees`, e);
            }
        };

        fetchEmployees();
    }, [api, employees]);

    return (
        <SetEmployeesContext.Provider value={setEmployees}>
            <EmployeesContext.Provider value={employees}>
                {children}
            </EmployeesContext.Provider>
        </SetEmployeesContext.Provider>
    );
};

export const useEmployees = () => useContext(EmployeesContext);
export const useSetEmployees = () => useContext(SetEmployeesContext);

export default EmployeesProvider;
