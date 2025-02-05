import { ProductionProcess } from "../../types";

export const getProductionProcesses = (productionProcessesRaw: string | null): ProductionProcess[] => {
    return productionProcessesRaw ? JSON.parse(productionProcessesRaw) as ProductionProcess[] : [];
};

export const getProductionProcessesByProduct = (
    productionProcesses: ProductionProcess[],
    productId?: string
): ProductionProcess[] => {
    return productId ? productionProcesses.filter(process => process.product_id === productId) : [];
};

export const updateProcesses = (
    allProcesses: ProductionProcess[],
    processes: ProductionProcess[],
    productId: string
): ProductionProcess[] => {
    return [...allProcesses.filter(process => process.product_id !== productId), ...processes];
};