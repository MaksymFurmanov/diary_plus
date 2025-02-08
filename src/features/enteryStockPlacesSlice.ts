import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EntryStockPlace} from "../types";
import {
    deleteEntryStockPlaces,
    getEntryStockPlaces,
    updateEntryStock
} from "../utils/storage/enteryStockPlaces";
import {RootState} from "../state";

interface EntryStockState {
    entryStockPlaces: EntryStockPlace[];
}

const initialState: EntryStockState = {
    entryStockPlaces: getEntryStockPlaces(),
};

const entryStockSlice = createSlice({
    name: "entryStockPlaces",
    initialState,
    reducers: {
        updateEntryStockPlaces: (state, action: PayloadAction<{ places: string[]; materialId: string }>) => {
            state.entryStockPlaces = updateEntryStock(action.payload.places, action.payload.materialId);
        },
        removeEntryStockPlaces: (state, action: PayloadAction<string[]>) => {
            state.entryStockPlaces = deleteEntryStockPlaces(action.payload);
        },
    },
});

export const selectEntryStock = (state: RootState) => state.entryStockPlaces.entryStockPlaces;

export const {updateEntryStockPlaces, removeEntryStockPlaces} = entryStockSlice.actions;
export default entryStockSlice.reducer;
