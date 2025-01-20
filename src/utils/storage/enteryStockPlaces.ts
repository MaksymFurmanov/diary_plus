import {EntryStockPlace} from "../../types";

export const getEntryStockPlaces = (): EntryStockPlace[] | null => {
    const entryStockPlacesRaw = localStorage.getItem("entryStockPlaces");
    if(!entryStockPlacesRaw) return null;
    return JSON.parse(entryStockPlacesRaw) as EntryStockPlace[];
}