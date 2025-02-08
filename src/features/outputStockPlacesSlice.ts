import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {OutputStockPlace} from "../types";
import {
    deleteOutputStockPlaces,
    getOutputStockPlaces,
    updateOutputStock
} from "../utils/storage/outputStockPlaces";
import {RootState} from "../state";

interface OutputStockState {
    outputStockPlaces: OutputStockPlace[];
}

const initialState: OutputStockState = {
    outputStockPlaces: getOutputStockPlaces(),
};

const outputStockSlice = createSlice({
    name: "outputStockPlaces",
    initialState,
    reducers: {
        updateOutputStockPlaces: (state, action: PayloadAction<{ places: string[]; orderId: string }>) => {
            state.outputStockPlaces = updateOutputStock(action.payload.places, action.payload.orderId);
        },
        removeOutputStockPlaces: (state, action: PayloadAction<string[]>) => {
            state.outputStockPlaces = deleteOutputStockPlaces(action.payload);
        },
    },
});

export const selectOutputStock = (state: RootState) => state.outputStockPlaces.outputStockPlaces;

export const {updateOutputStockPlaces, removeOutputStockPlaces} = outputStockSlice.actions;
export default outputStockSlice.reducer;
