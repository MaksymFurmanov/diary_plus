import {useParams} from "react-router-dom";
import PageTitle from "../components/BasicComponents/PageTitle";
import {useEffect} from "react";
import {getEmployeeById} from "../utils/storage/employees";
import {useEmployeeInput} from "../providers/EmployeeInputProvider";
import useExitAlert from "../hooks/useExitAlert";
import {isManager} from "../utils/storage/departments";
import EmployeeForm from "../components/Employees/EmployeeForm";

const EmployeeInfo = ({existing}: {
    existing: boolean
}) => {
    const {employeeId} = useParams();

    const {employee, setEmployee} = useEmployeeInput();

    const {ExitAlert, exitFunction} = useExitAlert(employee.changed && existing, "admin");

    useEffect(() => {
        if (!existing) return;

        const existingEmployee = getEmployeeById(employeeId);
        if (!existingEmployee) throw new Error("Employee not found");

        setEmployee((prevState) => ({
                ...prevState,
                ...existingEmployee,
                manager: isManager(employeeId, [existingEmployee.department_id])
            })
        );

    }, []);

    return <>
        <PageTitle name={existing ? "Employee" : "New employee"}
                   onBack={exitFunction}
        />

        <EmployeeForm/>

        {ExitAlert}
    </>
}

export default EmployeeInfo;