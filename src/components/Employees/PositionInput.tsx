import {getEmployees} from "../../utils/storage/employees";
import {useEmployeeInput} from "../../providers/EmployeeInputProvider";
import Input from "../BasicComponents/Input";

const PositionInput = () => {
    const employees = getEmployees() || [];

    const {employee, setEmployee} = useEmployeeInput();

    const uniquePositionsSet = new Set();
    const positionList = employees.map((employee, index) => {
        if (!uniquePositionsSet.has(employee.position)) {
            uniquePositionsSet.add(employee.position);
            return <option key={index} value={employee.position}/>;
        } else return null;
    });

    return (
        <>
            <Input name={"position"}
                   value={employee.position}
                   position={"close"}
                   setter={setEmployee}
                   state={employee}
                   list={"positionList"}
            >
                Position:
            </Input>
            <datalist id="positionList">
                {positionList}
            </datalist>
        </>
    );
}

export default PositionInput;