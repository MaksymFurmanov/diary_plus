import {useEmployeeInput} from "../../providers/EmployeeInputProvider";
import {useNavigate} from "react-router-dom";
import Input from "../BasicComponents/Input";
import DepartmentInput from "../DepartmentInput";
import PositionInput from "./PositionInput";
import MutateButtons from "../BasicComponents/MutateButtons";
import {createEmployee, deleteEmployee, updateEmployee} from "../../utils/storage/employees";
import {setManager} from "../../utils/storage/departments";
import {ChangeEvent} from "react";

const EmployeeForm = () => {
    const navigate = useNavigate();

    const {employee, setEmployee} = useEmployeeInput();

    const deleteHandler = () => {
        if (!employee.id) return;
        deleteEmployee(employee.id);
        navigate("/admin");
    }

    const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (employee.id) {
            if (employee.manager) setManager(employee.id, employee.department_id);
            updateEmployee(employee);
        } else {
            createEmployee(employee);
        }

        navigate("/admin");
    }

    const departmentSetter = (e: ChangeEvent<HTMLSelectElement>) => {
        setEmployee(prevState => {
            return {
                ...prevState,
                department_id: e.target.value
            }
        })
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

            <DepartmentInput state={employee} setter={departmentSetter}/>

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