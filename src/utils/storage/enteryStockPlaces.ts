import {EntryStockPlace} from "../../types";

export const getEntryStockPlaces = (): EntryStockPlace[] | null => {
    const entryStockPlacesRaw = localStorage.getItem("entryStockPlaces");
    if(!entryStockPlacesRaw) return null;
    return JSON.parse(entryStockPlacesRaw) as EntryStockPlace[];
}

export const updateEntryStock = (places: string[]) => {
  const stockPlaces = getEntryStockPlaces() || [];
  
  const changedPlaces = stockPlaces.map((stockPlace) => {
    const newPlace = places.find((place) =>
      stockPlace.id === place);
    newPlace.id = itemId;
    return newPlace;
  });
  
  
}