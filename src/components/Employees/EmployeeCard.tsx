import {IoPerson} from "react-icons/io5";
import Button from "../BasicComponents/Button";
import {useNavigate} from "react-router-dom";
import {Employee} from "../../types";
import {isManager} from "../../utils/storage/departments";

const EmployeeCard = ({employee}: {
    employee: Employee,
}) => {
    const navigate = useNavigate();

    const manager = isManager(employee.id);

    return (
        <div className={"EmployeeCard"}
             style={{borderColor: manager ? "red" : "default"}}
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