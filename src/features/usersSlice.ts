import {createSlice} from "@reduxjs/toolkit";
import {User} from "../types";
import {createUser, deleteUser, getUsers, updateUser} from "../utils/storage/users";
import {addEmployee, editEmployee, removeEmployee} from "./employeesSlice";
import {RootState} from "../state";

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: getUsers(),
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addEmployee, (state, action) => {
                if(!action.payload.id) return;
                state.users = createUser({employee_id: action.payload.id, login: action.payload.login, password: action.payload.password})
            })
            .addCase(editEmployee, (state, action) => {
                if(!action.payload.id) return;
                state.users = updateUser({employee_id: action.payload.id, login: action.payload.login, password: action.payload.password})
            })
            .addCase(removeEmployee, (state, action) => {
                state.users = deleteUser(action.payload);
            });
    }
});

export const selectUsers = (state: RootState) => state.users.users;
export const selectUserById = (state: RootState, employeeId?: string) =>
    employeeId ? state.users.users.find(userItem => userItem.employee_id === employeeId) || null : null;

export default userSlice.reducer;