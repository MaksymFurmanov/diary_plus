import {Employee} from "../../types";

export const getEmployees = (): Employee[] | null => {
    const employeesRaw = localStorage.getItem("employees");
    if(!employeesRaw) return null;
    return JSON.parse(employeesRaw) as Employee[];
}

export const getEmployeeById = (employeeId: string) => {
    const employeesRaw = localStorage.getItem("employees");
    if(!employeesRaw) return null;

    const allEmployees = JSON.parse(employeesRaw);
    return allEmployees.find((employee: Employee) => employee.id === employeeId);
}