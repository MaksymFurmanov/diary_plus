import {IoPerson} from "react-icons/io5";
import Button from "../BasicComponents/Button";
import {useNavigate} from "react-router-dom";
import {Employee} from "../../types";

const EmployeeCard = ({employee, isManager}: {
    employee: Employee,
    isManager: boolean
}) => {
    const navigate = useNavigate();

    return (
        <div className={"EmployeeCard"}
             style={{borderColor: isManager ? "red" : "default"}}
        >
            <div><IoPerson/></div>
            <p>{employee.name}</p>
            <p>{employee.position}</p>
            <Button onClick={() => navigate(`${employee.id}`)}>
                VIAC
            </Button>
        </div>
    );
}

export default EmployeeCard