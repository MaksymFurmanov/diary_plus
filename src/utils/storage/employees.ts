import {Employee, EmployeeInput} from "../../types";
import {nanoid} from "@reduxjs/toolkit";
import employees from "../../initialData/employees";

export const getEmployees = (): Employee[] => {
    const employeesRaw = localStorage.getItem("employees");
    return employeesRaw ? JSON.parse(employeesRaw) as Employee[] : employees;
}

export const createEmployee = (employeeInput: EmployeeInput): Employee[] => {
    const employees = getEmployees();
    const id = nanoid();

    const newEmployee: Employee = {
        id,
        department_id: employeeInput.department_id,
        name: employeeInput.name,
        position: employeeInput.position,
        date_of_birth: employeeInput.date_of_birth,
    };

    const updatedEmployees = [...employees, newEmployee];
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    return updatedEmployees;
};

export const updateEmployee = (employeeInput: EmployeeInput): Employee[] => {
    const employees = getEmployees();
    const updatedEmployees = employees.map(employeeItem =>
        employeeItem.id === employeeInput.id
            ? {...employeeItem, ...employeeInput, date_of_birth: employeeInput.date_of_birth}
            : employeeItem
    );

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    return updatedEmployees;
};

export const deleteEmployee = (employeeId: string): Employee[] => {
    const employees = getEmployees();
    const updatedEmployees = employees.filter((employeeItem) => employeeItem.id !== employeeId);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    return updatedEmployees;
};
