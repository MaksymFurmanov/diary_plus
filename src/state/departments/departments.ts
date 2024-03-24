import {createSlice} from "@reduxjs/toolkit";

export interface DepartmentState {
    department_id: number,
    manager_id: number,
    name: string
}

const initialState: Array<DepartmentState> = [];

const departmentsSlice = createSlice({
    name: "departments",
    initialState,
    reducers: {}
});

const DepartmentsReducer = departmentsSlice.reducer;
export default DepartmentsReducer;