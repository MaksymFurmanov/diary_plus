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
    const departments = useSelector(departmentsSelector.data);
    const employees = useSelector(employeesSelector.data);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    let {employeeId} = useParams();
    employeeId = parseInt(employeeId);

    const [employee, setEmployee] = useState({
        employee_id: "",
        department_id: "",
        department: null,
        name: "",
        position: "",
        date_of_birth: "",
        login: "",
        password: "",
        manager: false,
        changed: false
    });
    const [exitAlert, setExitAlert] = useState(false);

    useEffect(() => {
        if (existing) {
            const existingEmployee = employees.find((employee) =>
                employee.employee_id === employeeId);

            if (existingEmployee) setEmployee((prevState) => ({
                    ...prevState,
                    ...existingEmployee,
                    manager: existingEmployee.department_id
                        === existingEmployee.department.manager_id
                })
            );
        }
    }, [existing, employeeId, employee.employee_id,
        employee.department_id, employees, departments]);

    const departmentOptions = departments.map((department, index) => {
        return <option key={index}
                       value={department.department_id}>
            {department.name}
        </option>
    });

    const uniquePositionsSet = new Set();
    const positionList = employees.map((employee, index) => {
        if (!uniquePositionsSet.has(employee.position)) {
            uniquePositionsSet.add(employee.position);
            return <option key={index} value={employee.position}/>;
        } else return null;
    });

    const deleteHandler = () => {
        dispatch(deleteEmployee(employee));
        navigate("/admin");
    }

    const submitHandler = (e) => {
        e.preventDefault();

        if (existing) {
            if (employee.manager) dispatch(setManager(employee));
            dispatch(updateEmployee(employee));
        } else {
            dispatch(createEmployee(employee));
        }

        navigate("/admin");
    }

    const backHandler = () => {
        if (employee.changed && existing) setExitAlert(true);
        else navigate("/admin");
    }

    return <>
        <PageTitle name={existing ? "Pracovník" : "Nový pracovník"}
                   onBack={backHandler}/>
        <form className={"EmployeeInfo"}
              onSubmit={submitHandler}>
            <Input name={"name"}
                   value={employee.name}
                   position={"close"}
                   setter={setEmployee}
                   state={employee}>
                Titul, meno a priezvisko:
            </Input>
            <Input name={"date_of_birth"}
                   value={employee.date_of_birth}
                   size={2}
                   position={"close"}
                   setter={setEmployee}
                   state={employee}>
                Datum narodenia:
            </Input>
            <Input
                name={"department_id"}
                type={"select"}
                value={employee.department_id}
                position={"close"}
                setter={setEmployee}
                state={employee}
                options={departmentOptions}
            >
                Oddelenie:
            </Input>
            <div className={"h-center"} style={{gap: "2em"}}>
                <Input name={"position"}
                       value={employee.position}
                       position={"close"}
                       setter={setEmployee}
                       state={employee}
                       list={"positionList"}>
                    Pracovná pozícia:
                </Input>
                <datalist id="positionList">
                    {positionList}
                </datalist>
                <Input name={"manager"}
                       type={"checkbox"}
                       size={0}
                       position={"close"}
                       setter={setEmployee}
                       state={employee}
                       checked={employee.manager}>
                    Manažér:
                </Input>
            </div>
            <div className={"h-end"}>
                <div className={"authorization-data"}>
                    <h2>Prihlasovacie údaje:</h2>
                    <Input name={"login"}
                           value={employee.login}
                           position={"close"}
                           setter={setEmployee}
                           state={employee}>
                        Meno:
                    </Input>
                    <Input name={"password"}
                           value={employee.password}
                           position={"close"}
                           setter={setEmployee}
                           state={employee}>
                        Heslo:
                    </Input>
                </div>
                <div className={"bottom-buttons"}>
                    {existing
                        ? <><Button type={"button"}
                                    onClick={deleteHandler}>VYMAZAŤ</Button>
                            <Button type={"submit"}>
                                ÚPRAVIŤ
                            </Button></>
                        : <Button type={"submit"}>
                            PRIDAŤ
                        </Button>
                    }
                </div>
            </div>
        </form>
        {exitAlert && <Alert
            yesRoute={"/admin"}
            onHide={() => setExitAlert(false)}>
            Pokračovať bez úprav?</Alert>}
    </>
}

export default EmployeeInfo