import {createContext, useContext} from "react";
import useReadData from "../hooks/useReadData";

const MaterialsContext = createContext(undefined);
const SetMaterialsContext = createContext(undefined);

const MaterialsProvider = ({children}) => {
    const [materials, setMaterials, loading] =
        useReadData("materials");

    return <SetMaterialsContext.Provider value={setMaterials}>
        <MaterialsContext.Provider value={materials}>
            {loading ? <p>Loading...</p>: children}
        </MaterialsContext.Provider>
    </SetMaterialsContext.Provider>
}

export const useMaterials = () => useContext(MaterialsContext);
export const useSetMaterials = () => useContext(SetMaterialsContext);

export default MaterialsProvider