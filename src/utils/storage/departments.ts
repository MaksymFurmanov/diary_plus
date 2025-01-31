import {Department} from "../../types";

export const getDepartments = (): Department[] | null => {
    const departmentsRaw = localStorage.getItem("departments");
    if(!departmentsRaw) return null;
    return JSON.parse(departmentsRaw) as Department[];
}

export const isManager = (userId?: string, departmentsIds?: string[]): boolean => {
    if(!userId) return false;
    const departmentsRaw = localStorage.getItem("departments");
    if(!departmentsRaw) return false;

    const allDepartments = JSON.parse(departmentsRaw) as Department[];

    //If departments do not matter
    if(!departmentsIds) return !!allDepartments.find((department) =>
        department.manager_id === userId);

    //If departments specified
    const department = allDepartments.find((department: Department) =>
        departmentsIds.find((departmentId: string) => department.id === departmentId));
    if(!department) return false;

    return department.manager_id === userId;
}

export const setManager = (userId: string, departmentId: string) => {
    if(!userId) return false;
    const departmentsRaw = localStorage.getItem("departments");
    if(!departmentsRaw) return false;

    let data = JSON.parse(departmentsRaw) as Department[];

    const department = data.find((department: Department) =>
        department.id === departmentId);
    if(!department) return false;

    data = data.map((departmentItem: Department) => {
        if(departmentItem.id === department.id) return {...departmentItem, manager_id: userId};
        return departmentItem;
    });

    localStorage.setItem("departments", JSON.stringify(data));
}
