import {createContext, useContext, useState} from "react";
import materialsData from "../data/materials";

const MaterialsContext = createContext(undefined);
const SetMaterialsContext = createContext(undefined);

const MaterialsProvider = ({children}) => {
    const [materials, setMaterials] = useState(materialsData);

    return <SetMaterialsContext.Provider value={setMaterials}>
        <MaterialsContext.Provider value={materials}>
            {children}
        </MaterialsContext.Provider>
    </SetMaterialsContext.Provider>
}

export const useMaterials = () => useContext(MaterialsContext);
export const useSetMaterials = () => useContext(SetMaterialsContext);

export default MaterialsProvider