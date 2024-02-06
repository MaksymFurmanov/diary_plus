import {createContext, useContext, useState} from "react";
import departmentsData from "../data/departments";

const DepartmentsContext = createContext(undefined);
const SetDepartmentsContext = createContext(undefined);

const DepartmentsProvider = ({children}) => {
    const [departments, setDepartments] = useState(departmentsData);

    return <SetDepartmentsContext.Provider value={setDepartments}>
        <DepartmentsContext.Provider value={departments}>
            {children}
        </DepartmentsContext.Provider>
    </SetDepartmentsContext.Provider>
}

export const useDepartments = () => useContext(DepartmentsContext);
export const useSetDepartments = () => useContext(SetDepartmentsContext);

export default DepartmentsProvider