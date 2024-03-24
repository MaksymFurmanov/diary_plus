import {configureStore} from "@reduxjs/toolkit";
// @ts-ignore
import userReducer from "./user/userSlice.ts";
// @ts-ignore
import serverReducer from "./server/server.ts"

const store = configureStore({
    reducer: {
        user: userReducer,
        server: serverReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;