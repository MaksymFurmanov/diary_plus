import {useEmployeeInput} from "../../providers/EmployeeInputProvider";
import {useNavigate} from "react-router-dom";
import Input from "../BasicComponents/Input";
import PositionInput from "./PositionInput";
import MutateButtons from "../BasicComponents/MutateButtons";
import {ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../state";
import {selectDepartments, updateManager} from "../../features/departmentsSlice";
import {addEmployee, editEmployee, removeEmployee} from "../../features/employeesSlice";
import {Department} from "../../types";

const EmployeeForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const departments = useSelector(selectDepartments);
    if (!departments) throw new Error("Departments fetching failed");

    const {employee, setEmployee} = useEmployeeInput();

    const deleteHandler = () => {
        if (!employee.id) return;
        removeEmployee(employee.id);
        navigate("/admin");
    }

    const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (employee.id) {
            if (employee.manager) dispatch(updateManager({
                userId: employee.id,
                departmentId: employee.department_id
            }));
            dispatch(editEmployee(employee));
        } else {
            dispatch(addEmployee(employee));
        }

        navigate("/admin");
    }

    return (
        <form className={"EmployeeInfo"}
              onSubmit={submitHandler}
        >
            <Input name={"name"}
                   value={employee.name}
                   position={"close"}
                   setter={setEmployee}
                   state={employee}>
                Name and surname:
            </Input>
            <Input type={"date"}
                   name={"date_of_birth"}
                   value={employee.date_of_birth.toString().slice(0, 10)}
                   size={2}
                   position={"close"}
                   setter={setEmployee}
                   state={employee}>
                Date of birth:
            </Input>

            <Input type={"select"}
                   name={"department_id"}
                   value={employee.department_id}
                   id={"department_id"}
                   position={"close"}
                   setter={setEmployee}
                   state={employee}
                   options={(
                       <>
                           {departments.map((department: Department,
                                             index: number) => {
                               return (
                                   <option value={department.id} key={index}>
                                       {department.name}
                                   </option>
                               )
                           })}
                       </>
                   )}
            >
                Department:
            </Input>

            <div className={"h-center"} style={{gap: "2em"}}
            >
                <PositionInput/>
                <Input name={"manager"}
                       type={"checkbox"}
                       size={0}
                       position={"close"}
                       setter={setEmployee}
                       state={employee}
                       checked={employee.manager}>
                    Manager:
                </Input>
            </div>

            <div className={"h-end"}>
                <div className={"authorization-data"}>
                    <h2>
                        Login data:
                    </h2>
                    <Input name={"login"}
                           value={employee.login}
                           position={"close"}
                           setter={setEmployee}
                           state={employee}>
                        Login:
                    </Input>
                    <Input name={"password"}
                           value={employee.password}
                           position={"close"}
                           setter={setEmployee}
                           state={employee}>
                        Password:
                    </Input>
                </div>
                <MutateButtons id={employee.id}
                               deleteHandler={deleteHandler}
                />
            </div>
        </form>
    );
}

export default EmployeeForm;