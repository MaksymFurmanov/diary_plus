import {useNavigate, useParams} from "react-router-dom";
import PageTitle from "../BasicComponents/PageTitle";
import Input from "../BasicComponents/Input.tsx";
import Button from "../BasicComponents/Button.tsx";
import {useEffect, useState} from "react";
import {useDepartments, useSetDepartments} from "../../providers/DepartmentsProvider";
import {useEmployees, useSetEmployees} from "../../providers/EmployeesProvider";
import useLoadDataItem from "../../hooks/useLoadDataItem";
import {useServer} from "../../providers/ServerProvider";

const EmployeeInfo = ({existing}) => {
    const navigate = useNavigate();
    let {employeeId} = useParams();
    employeeId = parseInt(employeeId);
    const departments = useDepartments();
    const employees = useEmployees();
    const setEmployees = useSetEmployees();
    const [loadDataItem, loading] = useLoadDataItem();
    const api = useServer();
    const setDepartments = useSetDepartments();

    const [employee, setEmployee] = useState({
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
    const positionList = employees.map((employee, index) => {
        if (!uniquePositionsSet.has(employee.position)) {
            uniquePositionsSet.add(employee.position);
            return (
                <option key={index} value={employee.position}/>
            );
        } else return null;
    });

    const setManager = async (newEmployee) => {
        try {
            return await fetch(`${api}/departments/set-manager`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEmployee)
            });
        } catch (e) {
            console.error(e);
        }
    }

    const changeEmployeesState = (newEmployee) => {
        const employeeIndex = employees.findIndex((employeeItem) =>
            employeeItem.employee_id === newEmployee.employee_id);

        if (employeeIndex !== -1) {
            const newEmployees = [...employees];
            newEmployees[employeeIndex] =
                {...newEmployees[employeeIndex], ...newEmployee};
            setEmployees(newEmployees);
        } else {
            setEmployees(prevState => [...prevState, newEmployee]);
        }
        navigate("/admin");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        loadDataItem("employees", employee).then(newEmployee => {
            if (employee.manager === true) {
                setManager(newEmployee).then(() => {
                    changeEmployeesState(newEmployee);
                    const newDepartments = [...departments];
                    const index = newDepartments.findIndex(department =>
                        department.department_id === newEmployee.department_id);
                    newDepartments[index] = {
                        ...newDepartments[index],
                        manager_id: newEmployee.employee_id
                    };
                    setDepartments(newDepartments);
                });
            } else {
                changeEmployeesState(newEmployee);
            }

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