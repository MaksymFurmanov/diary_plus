import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {MaterialInput} from "../types";

export type MaterialType = {
    material: MaterialInput;
    setMaterial: Dispatch<SetStateAction<MaterialInput>>
}

const MaterialInputContext =
    createContext<MaterialType | undefined>(undefined);

const initialState: MaterialInput = {
    id: undefined,
    name: "",
    supplier: "",
    arriving_date: null,
    volume: 10,
    per_pallet: 10,
    pallet_color: "",
    changed: false
}

const MaterialInputProvider = ({children}: {
    children: ReactNode
}) => {
    const [material, setMaterial] = useState<MaterialInput>(initialState);

    return (
        <MaterialInputContext.Provider value={{material, setMaterial}}>
            {children}
        </MaterialInputContext.Provider>
    );
}

export const useMaterialInput = () => {
    const context = useContext(MaterialInputContext);
    if (!context) {
        throw new Error("Material context is not found");
    }
    return context;
};

export default MaterialInputProvider;