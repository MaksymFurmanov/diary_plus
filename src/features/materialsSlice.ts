import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Material, MaterialInput} from "../types";
import {createMaterial, deleteMaterial, getMaterials, markArrived, updateMaterial} from "../utils/storage/materials";
import {RootState} from "../state";

interface MaterialState {
    materials: Material[];
}

const initialState: MaterialState = {
    materials: getMaterials(),
};

const materialSlice = createSlice({
    name: "materials",
    initialState,
    reducers: {
        addMaterial: (state, action: PayloadAction<MaterialInput>) => {
            state.materials = createMaterial(action.payload);
        },
        editMaterial: (state, action: PayloadAction<MaterialInput>) => {
            state.materials = updateMaterial(action.payload);
        },
        removeMaterial: (state, action: PayloadAction<string>) => {
            state.materials = deleteMaterial(action.payload);
        },
        markMaterialsArrived: (state, action: PayloadAction<string>) => {
            state.materials = markArrived(action.payload);
        },
    },
});

export const selectMaterials = (state: RootState) => state.materials.materials;
export const selectMaterialById = (state: RootState, materialId?: string) =>
    materialId ? state.materials.materials.find(materialItem => materialItem.id === materialId) || null : null;

export const {addMaterial, editMaterial, removeMaterial, markMaterialsArrived} = materialSlice.actions;
export default materialSlice.reducer;