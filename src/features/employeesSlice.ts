import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Employee, EmployeeInput} from "../types";
import {createEmployee, deleteEmployee, getEmployees, updateEmployee} from "../utils/storage/employees";
import {RootState} from "../state";

interface EmployeeState {
    employees: Employee[];
}

const initialState: EmployeeState = {
    employees: getEmployees(),
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        addEmployee: (state, action: PayloadAction<EmployeeInput>) => {
            state.employees = createEmployee(action.payload);
        },
        editEmployee: (state, action: PayloadAction<EmployeeInput>) => {
            state.employees = updateEmployee(action.payload);
        },
        removeEmployee: (state, action: PayloadAction<string>) => {
            state.employees = deleteEmployee(action.payload);
        },
    }
});

export const selectEmployees = (state: RootState) => state.employees.employees;
export const selectEmployeeById = (state: RootState, employeeId?: string) =>
    employeeId ? state.employees.employees.find(employeeItem => employeeItem.id === employeeId) || null : null;

export const {addEmployee, editEmployee, removeEmployee} = employeeSlice.actions;
export default employeeSlice.reducer;