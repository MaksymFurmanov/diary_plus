import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {EmployeeInput} from "../types";

export type EmployeeType = {
    employee: EmployeeInput;
    setEmployee: Dispatch<SetStateAction<EmployeeInput>>
}

const EmployeeInputContext =
    createContext<EmployeeType | undefined>(undefined);

const initialState: EmployeeInput = {
    id: undefined,
    department_id: "",
    name: "",
    position: "",
    date_of_birth: new Date(),
    login: "",
    password: "",
    manager: false,
    changed: false
}

const EmployeeInputProvider = ({children}: {
    children: ReactNode
}) => {
    const [employee, setEmployee] = useState<EmployeeInput>(initialState);

    return (
        <EmployeeInputContext.Provider value={{employee, setEmployee}}>
            {children}
        </EmployeeInputContext.Provider>
    );
}

export const useEmployeeInput = () => {
    const context = useContext(EmployeeInputContext);
    if (!context) {
        throw new Error("Employee context is not found");
    }
    return context;
};

export default EmployeeInputProvider;