import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ProductsTest} from "../types";
import {
    createProductsTest,
    deleteProductsTest,
    getProductsTests
} from "../utils/storage/productsTests";
import {changeProductsTestResult} from "../utils/storage/productsTests";
import {markProcessDone, removeOrder} from "./ordersSlice";
import {getProductionProcessesByProduct} from "../utils/storage/productionProcesses";
import {RootState} from "../state";

interface ProductsTestState {
    productsTests: ProductsTest[];
}

const initialState: ProductsTestState = {
    productsTests: getProductsTests(),
};

const productsTestSlice = createSlice({
    name: "productsTests",
    initialState,
    reducers: {
        setProductsTestResult: (state, action: PayloadAction<{ testId: string, result: boolean }>) => {
            state.productsTests = changeProductsTestResult(
                action.payload.testId,
                action.payload.result
            );
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(markProcessDone, (state, action) => {
                if(action.payload.productionProcess.queue + 1
                    === getProductionProcessesByProduct(action.payload.productionProcess.product_id).length) {
                    state.productsTests = createProductsTest(action.payload.orderId);
                }
            })
            .addCase(removeOrder, (state, action) => {
                state.productsTests = deleteProductsTest(action.payload);
            })
    }
});

export const selectProductsTests = (state: RootState) => state.productsTests.productsTests;

export const {setProductsTestResult} = productsTestSlice.actions;
export default productsTestSlice.reducer;
