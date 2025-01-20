import {ProductionProcess} from "../../types";

export const getProductionProcesses = (): ProductionProcess[] | null => {
    const productionProcessesRaw = localStorage.getItem("productionProcesses");
    if(!productionProcessesRaw) return null;

    return JSON.parse(productionProcessesRaw) as ProductionProcess[];
}

export const getProductionProcessesByProduct = (productId?: string): ProductionProcess[] | null => {
    if(!productId) return null;

    const productionProcessesRaw = localStorage.getItem("productionProcesses");
    if(!productionProcessesRaw) return null;
    const data = JSON.parse(productionProcessesRaw) as ProductionProcess[];

    return data.filter((productionProcess) =>
        productionProcess.product_id === productId
    );
}