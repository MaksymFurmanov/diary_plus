import {OutputStockPlace} from "../../types";

export const getOutputStockPlaces = (): OutputStockPlace[] | null => {
    const outputStockPlacesRaw = localStorage.getItem("outputStockPlaces");
    if(!outputStockPlacesRaw) return null;
    return JSON.parse(outputStockPlacesRaw) as OutputStockPlace[];
}

