import {DepartmentState} from "../departments/departments";
import {createSlice} from "@reduxjs/toolkit";

export interface EmployeeState {
    employee_id: number,
    department_id: number,
    department: DepartmentState,
    name: string,
    position: string,
    date_of_birth: string,
    login: string,
    password: string,
    manager?: boolean
}

const initialState: Array<EmployeeState> = [];

const employeesSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {}
});

const EmployeesReducer = employeesSlice.reducer;
export default EmployeesReducer;