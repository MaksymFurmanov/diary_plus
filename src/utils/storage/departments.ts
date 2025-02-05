import { Department } from "../../types";

export const getDepartments = (departmentsRaw: string | null): Department[] => {
    return departmentsRaw ? JSON.parse(departmentsRaw) as Department[] : [];
};

export const isManager = (departments: Department[], userId?: string, departmentsIds?: string[]): boolean => {
    if (!userId) return false;

    // If departments do not matter
    if (!departmentsIds) {
        return departments.some(department => department.manager_id === userId);
    }

    // If specific departments are provided
    return departments.some(department =>
        departmentsIds.includes(department.id) && department.manager_id === userId
    );
};

export const setManager = (departments: Department[], userId: string, departmentId: string): Department[] => {
    return departments.map(department =>
        department.id === departmentId ? { ...department, manager_id: userId } : department
    );
};