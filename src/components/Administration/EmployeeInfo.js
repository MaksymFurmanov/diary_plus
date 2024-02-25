import {useNavigate, useParams} from "react-router-dom";
import PageTitle from "../BasicComponents/PageTitle";
import Input from "../BasicComponents/Input.tsx";
import Button from "../BasicComponents/Button.tsx";
import {useEffect, useState} from "react";
import {useDepartments} from "../../providers/DepartmentsProvider";
import {useEmployees, useSetEmployees} from "../../providers/EmployeesProvider";
import useLoadDataItem from "../../hooks/useLoadDataItem";

const EmployeeInfo = ({existing}) => {
    const navigate = useNavigate();
    let {employeeId} = useParams();
    employeeId = parseInt(employeeId);
    const departments = useDepartments();
    const employees = useEmployees();
    const setEmployees = useSetEmployees();
    const [loadDataItem, loading] = useLoadDataItem();

    const [employee, setEmployee] = useState({
        employee_id: null,
        department_id: "",
        name: "",
        position: "",
        date_of_birth: "",
        login: "",
        password: "",
        manager: false,
        changed: false
    });

    useEffect(() => {
        if (existing) {
            const existingEmployee = employees.find((employee) =>
                employee.employee_id === employeeId);

            if (existingEmployee) setEmployee((prevState) => ({
                    ...prevState,
                    ...existingEmployee,
                    manager: departments.find((department) =>
                        department.department_id === existingEmployee.department_id)
                        ?.manager_id === existingEmployee.employee_id,
                })
            );
        }
    }, [existing, employeeId, employee.employee_id, employee.department_id, employees, departments]);

    const departmentOptions = departments.map((department, index) => {
        return <option key={index}
                       value={department.department_id}>
            {department.name}
        </option>
    });

    const uniquePositionsSet = new Set();
    const positionOptions = employees.map((employee, index) => {
        if (!uniquePositionsSet.has(employee.position)) {
            uniquePositionsSet.add(employee.position);
            return (
                <option key={index} value={employee.position}>
                    {employee.position}
                </option>
            );
        } else return null;
    });

    const submitHandler = (e) => {
        e.preventDefault();
        loadDataItem("employees", employee).then(newEmployee => {
            const employeeIndex = employees.findIndex((employeeItem) =>
                employeeItem.material_id === employee.material_id);

            if (employeeIndex !== -1) {
                const newEmployees = [...employees];
                newEmployees[employeeIndex] =
                    {...newEmployees[employeeIndex], ...newEmployee};
                setEmployees(newEmployees);
            } else {
                setEmployees(prevState => [...prevState, newEmployee]);
            }
            navigate("/orders/admin");
        });
    }

    return loading ? "Loading..." : <>
        <PageTitle name={existing ? "Pracovník" : "Nový pracovník"}
                   prev={"/admin"}/>
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
                       type={"select"}
                       value={employee.position}
                       position={"close"}
                       setter={setEmployee}
                       state={employee}
                       options={positionOptions}>
                    Pracovná pozícia:
                </Input>
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
                        ? <><Button>VYMAZAŤ</Button>
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
    </>
}

export default EmployeeInfo