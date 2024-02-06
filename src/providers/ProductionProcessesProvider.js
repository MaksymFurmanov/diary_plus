import {createContext, useContext, useState} from "react";
import productionProcessesData from "../data/production_processes";

const ProductionProcessesContext = createContext(undefined);
const SetProductionProcessesContext = createContext(undefined);

const ProductionProcessesProvider = ({children}) => {
    const [productionProcesses, setProductionProcesses] = useState(productionProcessesData);

    return <SetProductionProcessesContext.Provider value={setProductionProcesses}>
        <ProductionProcessesContext.Provider value={productionProcesses}>
            {children}
        </ProductionProcessesContext.Provider>
    </SetProductionProcessesContext.Provider>
}

export const useProductionProcesses = () => useContext(ProductionProcessesContext);
export const useSetProductionProcesses = () => useContext(SetProductionProcessesContext);

export default ProductionProcessesProvider