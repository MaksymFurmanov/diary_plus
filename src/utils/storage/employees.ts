import { Employee, EmployeeInput } from "../../types";
import { nanoid } from "@reduxjs/toolkit";
import { setManager } from "./departments";

export const getEmployees = (employeesRaw: string | null): Employee[] => {
  return employeesRaw ? JSON.parse(employeesRaw) as Employee[] : [];
}

export const getEmployeeById = (employees: Employee[], employeeId: string | undefined): Employee | null => {
  if (!employeeId) return null;
  return employees.find((employee) => employee.id === employeeId) || null;
}

export const createEmployee = (employees: Employee[], employeeInput: EmployeeInput): Employee[] => {
  const id = nanoid();

  const newEmployee: Employee = {
    id,
    department_id: employeeInput.department_id
    name: employeeInput.name,
    position: employeeInput.position,
    date_of_birth: new Date(employeeInput.date_of_birth),
  };

  if (employeeInput.manager) setManager(id, employeeInput.department_id);

  return [...employees, newEmployee];
};

export const updateEmployee = (employees: Employee[], employeeInput: EmployeeInput): Employee[] => {
  return employees.map(emp =>
    emp.id === employeeInput.id ?
    { ...emp, ...employeeInput, date_of_birth: new Date(employeeInput.date_of_birth) } :
    emp
  );
};

export const deleteEmployee = (employees: Employee[], employeeId: string): Employee[] => {
  return employees.filter((employee) => employee.id !== employeeId);
};