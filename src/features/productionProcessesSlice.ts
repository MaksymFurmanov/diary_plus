import {createSlice} from "@reduxjs/toolkit";
import {ProductionProcess} from "../types";
import {deleteProcesses, getProductionProcesses, updateProcesses} from "../utils/storage/productionProcesses";
import {addProduct, editProduct, removeProduct} from "./productsSlice";
import {RootState} from "../state";

interface ProductionProcessState {
    productionProcesses: ProductionProcess[];
}

const initialState: ProductionProcessState = {
    productionProcesses: getProductionProcesses(),
};

const productionProcessSlice = createSlice({
    name: "productionProcesses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addProduct, (state, action) => {
            if(!action.payload.id) return;
            state.productionProcesses = updateProcesses(action.payload.productionProcesses, action.payload.id);
        })
            .addCase(editProduct, (state, action) => {
                if(!action.payload.id) return;
                state.productionProcesses = updateProcesses(action.payload.productionProcesses, action.payload.id);
            })
            .addCase(removeProduct, (state, action) => {
                state.productionProcesses = deleteProcesses(action.payload);
            })
    }
});

export const selectProductionProcesses = (state: RootState) => state.productionProcesses.productionProcesses;
export const selectProductionProcessesByProduct = (state: RootState, productId?: string) =>
    productId ? state.productionProcesses.productionProcesses.filter(process => process.product_id === productId) : null;

export default productionProcessSlice.reducer;
