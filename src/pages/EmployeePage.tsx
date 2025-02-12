import {useParams} from "react-router-dom";
import PageTitle from "../components/BasicComponents/PageTitle";
import {useEffect} from "react";
import {useEmployeeInput} from "../providers/EmployeeInputProvider";
import useExitAlert from "../hooks/useExitAlert";
import {isManager} from "../utils/storage/departments";
import EmployeeForm from "../components/Employees/EmployeeForm";
import {useSelector} from "react-redux";
import {selectEmployeeById} from "../features/employeesSlice";
import {RootState} from "../state";
import {selectUserById} from "../features/usersSlice";

const EmployeeInfo = ({existing}: {
    existing: boolean
}) => {
    const {employeeId} = useParams();
    const existingEmployee = useSelector((state: RootState) => selectEmployeeById(state, employeeId));
    const user = useSelector((state: RootState) => selectUserById(state, employeeId));

    const {employee, setEmployee} = useEmployeeInput();

    const {ExitAlert, exitFunction} = useExitAlert(employee.changed && existing, "admin");

    useEffect(() => {
        if (!existing) return;

        if (!existingEmployee) throw new Error("Employee not found");
        if (!user) throw new Error("User not found");

        setEmployee((prevState) => ({
                ...prevState,
                ...existingEmployee,
                manager: isManager(employeeId, [existingEmployee.department_id]),
                login: user.login,
                password: user.password
            })
        );

    }, [employeeId, existing, existingEmployee, setEmployee, user]);

    return <>
        <PageTitle name={existing ? "Employee" : "New employee"}
                   onBack={exitFunction}
        />

        <EmployeeForm/>

        {ExitAlert}
    </>
}

export default EmployeeInfo;