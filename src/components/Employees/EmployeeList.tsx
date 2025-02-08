import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useState} from "react";
import EmployeeCard from "./EmployeeCard";
import {Department} from "../../types";
import {useSelector} from "react-redux";
import {selectEmployees} from "../../features/employeesSlice";

const EmployeeList = ({department}: {
    department: Department
}) => {
    const [showToggle, setShowToggle] = useState<boolean>(true);

    const employees = useSelector(selectEmployees);

    return (
        <div className={"EmployeeList"}>
            <div className={"department-title"}
                 onClick={() => setShowToggle(!showToggle)}>
                <picture>
                    {showToggle
                        ? <IoIosArrowDown/>
                        : <IoIosArrowUp/>}
                </picture>
                <h2>{department.name}</h2>
            </div>

            <div className={"line"}/>
            {showToggle && (
                <div className={"employee-cards"}>
                    {employees && employees
                        .filter(employee => employee.department_id === department.id)
                        .map((employee, index) => (
                        <EmployeeCard key={index}
                                      employee={employee}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default EmployeeList;