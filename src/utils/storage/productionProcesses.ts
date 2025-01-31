import {ProductionProcess} from "../../types";
import {getProductById} from "./products";

export const getProductionProcesses = (): ProductionProcess[] | null => {
    const productionProcessesRaw = localStorage.getItem("productionProcesses");
    if (!productionProcessesRaw) return null;

    return JSON.parse(productionProcessesRaw) as ProductionProcess[];
}

export const getProductionProcessesByProduct = (productId?: string): ProductionProcess[] | null => {
    if (!productId) return null;

    const productionProcessesRaw = localStorage.getItem("productionProcesses");
    if (!productionProcessesRaw) return null;
    const data = JSON.parse(productionProcessesRaw) as ProductionProcess[];

    return data.filter((productionProcess) =>
        productionProcess.product_id === productId
    );
}

export const updateProcesses = (processes: ProductionProcess[], productId: string) => {
    const allProcesses = getProductionProcesses() || [];
    if (!getProductById(productId)) throw new Error("The product not Found");

    let data = allProcesses.filter(process => process.product_id !== productId);

    data.push(...processes);

    localStorage.setItem("productionProcesses", JSON.stringify(data));
}