import {getDepartments} from "../utils/storage/departments";
import {Department} from "../types";
import {ChangeEvent} from "react";
import Input from "./BasicComponents/Input";

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
            <Input type={"select"}
                   name={"department_id"}
                   id={"department_id"}
                   state={state}
                   setter={setter}
                   options={<>
                       <option value={-1}/>
                       {departments.map((department: Department,
                                         index: number) => {
                           return (
                               <option value={department.id} key={index}>
                                   {department.name}
                               </option>
                           )
                       })}
                   </>}
            />
        </div>
    );
}

export default DepartmentInput;