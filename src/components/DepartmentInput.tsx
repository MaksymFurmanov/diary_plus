import {getDepartments} from "../utils/storage/departments";
import {Department} from "../types";
import {ChangeEvent} from "react";

const DepartmentInput = ({state, setter}: {
    state: any,
    setter: (e: ChangeEvent<HTMLSelectElement>) => void
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
                    value={state.department_id || ""}
                    onChange={setter}
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