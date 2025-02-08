import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getDepartments, isManager, removeManager, setManager} from "../utils/storage/departments";
import {Department} from "../types";
import {addEmployee, editEmployee, removeEmployee} from "./employeesSlice";
import {RootState} from "../state";

interface DepartmentState {
    departments: Department[];
}

const initialState: DepartmentState = {
    departments: getDepartments(),
};

const departmentSlice = createSlice({
    name: "departments",
    initialState,
    reducers: {
        updateManager: (state, action: PayloadAction<{ userId: string; departmentId: string }>) => {
            state.departments = setManager(action.payload.departmentId, action.payload.userId);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(addEmployee, (state, action) => {
                if (!action.payload.id) return;
                if (action.payload.manager) {
                    state.departments = setManager(action.payload.department_id, action.payload.id);
                }
            })
            .addCase(editEmployee, (state, action) => {
                if (!action.payload.id) return;
                if (action.payload.manager) {
                    state.departments = setManager(action.payload.department_id, action.payload.id);
                }
            })
            .addCase(removeEmployee, (state, action) => {
                if (isManager(action.payload)) {
                    state.departments = removeManager(action.payload);
                }
            })
    }
});

export const selectDepartments = (state: RootState) => state.departments.departments;

export const {updateManager} = departmentSlice.actions;
export default departmentSlice.reducer;
