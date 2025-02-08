import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MaterialsTest} from "../types";
import {
    changeMaterialsTestResult,
    createMaterialsTest, deleteMaterialsTest,
    getMaterialsTests
} from "../utils/storage/materialsTests";
import {markMaterialsArrived, removeMaterial} from "./materialsSlice";
import {RootState} from "../state";

interface MaterialsTestState {
    materialsTests: MaterialsTest[];
}

const initialState: MaterialsTestState = {
    materialsTests: getMaterialsTests(),
};

const materialsTestSlice = createSlice({
    name: "materialsTests",
    initialState,
    reducers: {
        setMaterialsTestResult: (state, action: PayloadAction<{ testId: string, result: boolean }>) => {
            state.materialsTests = changeMaterialsTestResult(
                action.payload.testId,
                action.payload.result
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(markMaterialsArrived, (state, action) => {
                state.materialsTests = createMaterialsTest(action.payload);
            })
            .addCase(removeMaterial, (state, action) => {
                state.materialsTests = deleteMaterialsTest(action.payload);
            })
    }
});

export const selectMaterialsTests = (state: RootState) => state.materialsTests.materialsTests;

export const {setMaterialsTestResult} = materialsTestSlice.actions;
export default materialsTestSlice.reducer;
