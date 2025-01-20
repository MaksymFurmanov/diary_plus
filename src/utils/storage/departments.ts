import {Department, Employee} from "../../types";

export const getDepartments = (): Department[] | null => {
    const departmentsRaw = localStorage.getItem("departments");
    if(!departmentsRaw) return null;
    return JSON.parse(departmentsRaw) as Department[];
}

export const isManager = (employeeId?: string, departmentsIds?: string[]): boolean | null => {
    if(!employeeId) return null;
    const departmentsRaw = localStorage.getItem("departments");
    if(!departmentsRaw) return null;

    const allDepartments = JSON.parse(departmentsRaw) as Department[];

    //If departments do not matter
    if(!departmentsIds) return !!allDepartments.find((department) =>
        department.manager_id === employeeId);

    //If departments specified
    const department = allDepartments.find((department: Department) =>
        departmentsIds.find((departmentId: string) => department.id === departmentId));
    if(!department) return null;

    return department.manager_id === employeeId;
}