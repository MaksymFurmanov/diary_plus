import {EntryStockPlace} from "../../types";
import {getMaterialById} from "./materials";
import entryStockPlaces from "../../initialData/enteryStockPlaces";

export const getEntryStockPlaces = (): EntryStockPlace[] => {
    const entryStockPlacesRaw = localStorage.getItem("entryStockPlaces");
    return entryStockPlacesRaw ? JSON.parse(entryStockPlacesRaw) as EntryStockPlace[] : entryStockPlaces;
};

export const updateEntryStock = (places: string[], materialId: string): EntryStockPlace[] => {
    const stockPlaces = getEntryStockPlaces();
    if (!getMaterialById(materialId)) throw new Error("The material not found");

    const placesSet = new Set(places);

    const updatedStockPlaces = stockPlaces.map(stockPlace =>
        placesSet.has(stockPlace.id)
            ? {...stockPlace, material_id: materialId}
            : stockPlace
    );

    const newStockPlaces = [...updatedStockPlaces, ...Array.from(placesSet).map(id => ({
        id,
        material_id: materialId
    }))];

    localStorage.setItem("entryStockPlaces", JSON.stringify(newStockPlaces));
    return newStockPlaces;
};

export const deleteEntryStockPlaces = (places: string[]): EntryStockPlace[] => {
    const stockPlaces = getEntryStockPlaces();
    const placesSet = new Set(places);

    const updatedStockPlaces = stockPlaces.filter(place => !placesSet.has(place.id));

    localStorage.setItem("entryStockPlaces", JSON.stringify(updatedStockPlaces));
    return updatedStockPlaces;
};