import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {EmployeeState} from "../employees/employees";
import {RootState} from "../store";

interface UserState {
    loading: boolean,
    userInfo: EmployeeState | null,
    error: string | null,
    success: boolean | null,
    manager: boolean
}

const initializeUser = (): UserState => {
    const storedUser = localStorage.getItem("user");
    return {
        loading: false,
        userInfo: storedUser ? JSON.parse(storedUser) : null,
        error: null,
        success: null,
        manager: false
    }
}

const initialState: UserState = initializeUser();

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reinitialize: () => {
            localStorage.setItem("user", null);
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
                state.success = true;
            })
            .addCase(logIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ? action.payload.toString() : "";
            })
    }
});

interface loginData {
    login: string,
    password: string
}

export const logIn = createAsyncThunk(
    "user/login",
    async ({login, password}: loginData, {rejectWithValue, getState}) => {
        try {
            const {server} = getState() as RootState;
            const response = await fetch(
                `${server["api"]}/user/log-in?username=${login}&password=${password}`
            );
            if (!response.ok) {
                rejectWithValue("Authentication failed");
            }
            const result = await response.json();
            localStorage.setItem("user", JSON.stringify(result));
            return {
                ...result,
                manager: result.department.manager_id === result.employee_id
            };
        } catch (error) {
            return rejectWithValue("Network error");
        }
    }
);

export const {reinitialize} = userSlice.actions;

const UserReducer = userSlice.reducer
export default UserReducer;
