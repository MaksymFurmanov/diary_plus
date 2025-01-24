import {Employee, EmployeeInput, User} from "../../types";
import {nanoid} from "@reduxjs/toolkit";
import {setManager} from "./departments";

export const getEmployees = (): Employee[] | null => {
    const employeesRaw = localStorage.getItem("employees");
    if (!employeesRaw) return null;
    return JSON.parse(employeesRaw) as Employee[];
}

export const getEmployeeById = (employeeId: string | undefined) => {
    if (!employeeId) return null;
    const employeesRaw = localStorage.getItem("employees");
    if (!employeesRaw) return null;

    const allEmployees = JSON.parse(employeesRaw);
    return allEmployees.find((employee: Employee) => employee.id === employeeId);
}

export const createEmployee = (employeeInput: EmployeeInput): void => {
    const employeesRaw = localStorage.getItem("employees");
    const usersRaw = localStorage.getItem("users");

    let data: Employee[] = employeesRaw
        ? JSON.parse(employeesRaw) as Employee[]
        : [];

    let usersData: User[] = usersRaw
        ? JSON.parse(usersRaw) as User[]
        : []

    const id = nanoid();

    data.push({
        id,
        department_id: employeeInput.department_id,
        name: employeeInput.name,
        position: employeeInput.position,
        date_of_birth: new Date(employeeInput.date_of_birth),
    } as Employee);

    usersData.push({
        employee_id: id,
        login: employeeInput.login,
        password: employeeInput.password
    } as User);

    localStorage.setItem("employees", JSON.stringify(data));
    localStorage.setItem("users", JSON.stringify(usersData));

    if (employeeInput.manager) setManager(id, employeeInput.department_id);
}

export const updateEmployee = (employeeInput: EmployeeInput): void => {
    const employeesRaw = localStorage.getItem("employees");
    if (!employeesRaw) throw new Error("Employees not found");

    let data: Employee[] = JSON.parse(employeesRaw) as Employee[];

    const oldEmployee = data.find((employee) => employee.id === employeeInput.id);
    if (!oldEmployee) throw new Error("The employee not found");

    const usersRaw = localStorage.getItem("users");
    if (!usersRaw) throw new Error("Users not found");

    let usersData: User[] = JSON.parse(usersRaw) as User[];

    const oldUser = usersData.find((user) => user.employee_id === employeeInput.id);
    if (!oldUser) throw new Error("The user not found");

    data = data.map((employee: Employee) => {
        if (employee.id === employeeInput.id) {
            return {
                id: oldEmployee.id,
                department_id: employeeInput.department_id,
                name: employeeInput.name,
                position: employeeInput.position,
                date_of_birth: new Date(employeeInput.date_of_birth),
            } as Employee;
        }

        return employee;
    });

    usersData = usersData.map((user: User) => {
        if (user.employee_id !== employeeInput.id) {
            return {
                employee_id: oldUser.employee_id,
                login: employeeInput.login,
                password: employeeInput.password
            } as User;
        }

        return user;
    });

    localStorage.setItem("employees", JSON.stringify(data));
    localStorage.setItem("users", JSON.stringify(usersData));
}

export const deleteEmployee = (employeeId: string): void => {
    const employeesRaw = localStorage.getItem("employees");
    if (!employeesRaw) throw new Error("Employees not found");

    let data: Employee[] = JSON.parse(employeesRaw) as Employee[];

    const employeeExists = data.some((employee) => employee.id === employeeId);
    if (!employeeExists) throw new Error("The employee not found");

    data = data.filter((employee: Employee) =>
        employee.id !== employeeId);
    localStorage.setItem("employees", JSON.stringify(data));
}