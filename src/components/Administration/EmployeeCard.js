import {IoPerson} from "react-icons/io5";
import Button from "../BasicComponents/Button.tsx";
import {useNavigate} from "react-router-dom";

const EmployeeCard = ({employee}) => {
    const navigate = useNavigate();

    return <div className={"EmployeeCard"}>
        <div><IoPerson/></div>
        <p>{employee.name}</p>
        <p>{employee.position}</p>
        <Button onClick={() =>
            navigate(`edit/${employee.employee_id}`)}>
            VIAC
        </Button>
    </div>
}

export default EmployeeCard