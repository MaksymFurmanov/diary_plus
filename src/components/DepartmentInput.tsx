import {Department, ProductionProcess} from "../../types";
import {getDepartments} from "../../utils/storage/departments";
import {ChangeEvent} from "react";

const DepartmentInput = ({process, inputHandler
  }: {
    process: ProductionProcess,
    inputHandler: (e: ChangeEvent<HTMLSelectElement>) => void
}) => {
    const departments = getDepartments();
    if (!departments) throw new Error("Departments fetching failed");

    return (
        <div>
            <label htmlFor={"department_id"}>
                Department:
            </label>
            <select name={"department_id"}
                    id={"department_id"}
                    value={process.department_id || ""}
                    onChange={inputHandler}
            >
                <option value={-1}/>
                {departments.map((department: Department,
                                  index: number) => {
                    return (
                        <option value={department.id} key={index}>
                            {department.name}
                        </option>
                    )
                })}
            </select>
        </div>
    );
}

export default DepartmentInput;