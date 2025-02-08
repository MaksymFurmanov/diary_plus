import {Department} from "../../types";

export const getDepartments = (): Department[] => {
    const departmentsRaw = localStorage.getItem("departments");
    return departmentsRaw ? JSON.parse(departmentsRaw) as Department[] : [];
};

export const isManager = (userId?: string, departmentsIds?: string[]): boolean => {
    if (!userId) return false;

    const departments = getDepartments() || [];

    // If departments do not matter
    if (!departmentsIds) {
        return departments.some(department => department.manager_id === userId);
    }

    // If departments are specified
    return departments.some(department =>
        departmentsIds.includes(department.id)
        && department.manager_id === userId
    );
}

export const setManager = (departmentId: string, userId: string): Department[] => {
    const departments = getDepartments();
    const updatedDepartments = departments.map(departmentItem =>
        departmentItem.id === departmentId ? {...departmentItem, manager_id: userId} : departmentItem
    );

    localStorage.setItem("departments", JSON.stringify(updatedDepartments));
    return updatedDepartments;
}

export const removeManager = (userId: string) => {
    const departments = getDepartments();

    const updatedDepartments = departments.map(department => {
        return department.id === userId
            ? {...department, manager_id: undefined}
            : department
    })

    localStorage.setItem("departments", JSON.stringify(updatedDepartments));
    return updatedDepartments;
}