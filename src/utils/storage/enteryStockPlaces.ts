import { EntryStockPlace } from "../../types";

export const getEntryStockPlaces = (entryStockPlacesRaw: string | null): EntryStockPlace[] => {
    return entryStockPlacesRaw ? JSON.parse(entryStockPlacesRaw) as EntryStockPlace[] : [];
};

export const updateEntryStock = (stockPlaces: EntryStockPlace[], places: string[], materialId: string): EntryStockPlace[] => {
    const placesSet = new Set(places);

    let updatedStockPlaces = stockPlaces.map((stockPlace) =>
        placesSet.has(stockPlace.id)
            ? { ...stockPlace, material_id: materialId }
            : stockPlace
    );

    const newPlaces = [...placesSet]
        .filter(placeId => !stockPlaces.some(stockPlace => stockPlace.id === placeId))
        .map(placeId => ({ id: placeId, material_id: materialId }));

    return [...updatedStockPlaces, ...newPlaces];
};

export const removeEntryStockPlaces = (stockPlaces: EntryStockPlace[], places: string[]): EntryStockPlace[] => {
    const placesSet = new Set(places);
    return stockPlaces.filter(place => !placesSet.has(place.id));
};