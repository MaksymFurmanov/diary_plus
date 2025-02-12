import {ProductionProcess} from "../../types";
import {getProductById} from "./products";
import productionProcesses from "../../initialData/productionProcesses";

export const getProductionProcesses = (): ProductionProcess[] => {
    const productionProcessesRaw = localStorage.getItem("productionProcesses");
    return productionProcessesRaw ? JSON.parse(productionProcessesRaw) as ProductionProcess[] : productionProcesses;
};

export const getProductionProcessesByProduct = (productId?: string): ProductionProcess[] => {
    if (!productId) return [];

    const productionProcessesRaw = localStorage.getItem("productionProcesses");
    if (!productionProcessesRaw) return [];
    const data = JSON.parse(productionProcessesRaw) as ProductionProcess[];

    return data.filter((productionProcess) =>
        productionProcess.product_id === productId
    );
};

export const updateProcesses = (processes: ProductionProcess[], productId: string): ProductionProcess[] => {
    const allProcesses = getProductionProcesses();
    if (!getProductById(productId)) throw new Error("The product not Found");

    const updatedProcesses = allProcesses.filter(process => process.product_id !== productId);
    updatedProcesses.push(...processes);

    localStorage.setItem("productionProcesses", JSON.stringify(updatedProcesses));
    return updatedProcesses;
};

export const deleteProcesses = (productId: string) => {
    const allProcesses = getProductionProcesses();

    const updatedProcesses = allProcesses.filter(process => process.product_id !== productId);
    localStorage.setItem("productionProcesses", JSON.stringify(updatedProcesses));
    return updatedProcesses;
}