import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useState} from "react";
import EmployeeCard from "./EmployeeCard";
import {useEmployees} from "../../providers/EmployeesProvider";

const EmployeeList = ({department}) => {
    const employees = useEmployees();

    const [showToggle, setShowToggle] = useState(true);
    const listCards = employees.map((employee, index) => {
        if (employee.department_id === department.department_id)
            return <EmployeeCard key={index}
                                 employee={employee}/>
        else return undefined;
    });

    const hideHandler = () => setShowToggle(!showToggle);

    return !listCards.every(obj => typeof obj === 'undefined') &&
        <div className={"EmployeeList"}>
            <div className={"department-title"}>
                <picture onClick={hideHandler}>{showToggle
                    ? <IoIosArrowDown/>
                    : <IoIosArrowUp/>}</picture>
                <h2>{department.name}</h2>
            </div>
            <div className={"line"}/>
            {showToggle && <div className={"employee-cards"}>{listCards}</div>}
        </div>
}

export default EmployeeList;