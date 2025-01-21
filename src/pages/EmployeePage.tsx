import {useNavigate, useParams} from "react-router-dom";
import PageTitle from "../components/BasicComponents/PageTitle";
import Input from "../components/BasicComponents/Input.tsx";
import Button from "../components/BasicComponents/Button.tsx";
import {useEffect, useState} from "react";
import Alert from "../components/BasicComponents/Alert";
import {useDispatch, useSelector} from "react-redux";
import departmentsSelector from "../utils/storage/departments/selectors";
import employeesSelector from "../utils/storage/employees/selectors";
import deleteEmployee from "../utils/storage/employees/thunks/deleteEmployee";
import updateEmployee from "../utils/storage/employees/thunks/updateEmployee";
import setManager from "../utils/storage/departments/thunks/setManager";
import createEmployee from "../utils/storage/employees/thunks/createEmployee";

const EmployeeInfo = ({existing}: {
    existing: boolean
}) => {
  const {employeeId} = useParams();
  
  useEffect(() => {
        if (existing) {
            const existingEmployee = getExistingEmployee(employeeId);

            if (!existingEmployee) throw new Error ("Employee not found");
            setEmployee((prevState) => ({
                    ...prevState,
                    ...existingEmployee,
                    manager: isManager(employeeId, existingEmployee.department_id)
                })
            );
        }
    }, []);
    
    const [ExitAlert, exitFunction] = useExitAlert();

    return <>
        <PageTitle name={existing ? "Employee" : "New employee"}
                   onBack={exitFunction}
                   />
        <EmployeeForm/>
        <ExitAlert/>
    </>
}

export default EmployeeInfo;