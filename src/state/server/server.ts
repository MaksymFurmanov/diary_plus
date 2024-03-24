import {createSlice} from "@reduxjs/toolkit";

export interface ServerState {
    api: string
}

const initialState: ServerState = {
    api: "http://localhost:8083"
}

const serverSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}
});

const ServerReducer = serverSlice.reducer
export default ServerReducer;