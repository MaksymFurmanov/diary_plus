import {OutputStockPlace} from "../../types";
import {getMaterialById} from "./materials";

export const getOutputStockPlaces = (): OutputStockPlace[] | null => {
    const outputStockPlacesRaw = localStorage.getItem("outputStockPlaces");
    if(!outputStockPlacesRaw) return null;
    return JSON.parse(outputStockPlacesRaw) as OutputStockPlace[];
}

export const updateOutputStock = (places: string[], orderId: string) => {
    const stockPlaces = getOutputStockPlaces() || [];
    if (!getMaterialById(orderId)) throw new Error("The order not Found");

    const placesSet = new Set(places);

    let changedPlaces = stockPlaces.map((stockPlace) => {
        if (placesSet.has(stockPlace.id)) {
            placesSet.delete(stockPlace.id);
            return {
                ...stockPlace,
                material_id: orderId
            }
        }

        return stockPlace;
    });

    placesSet.forEach(place => {
        changedPlaces.push({
            id: place,
            order_id: orderId,
            put_date: new Date()
        })
    });
    localStorage.set("outputStockPlaces", changedPlaces);
}

export const removeOutputStockPlaces = (places: string[]) => {
    const stockPlaces = getOutputStockPlaces();
    if(!stockPlaces) return null;

    const placesSet = new Set(places);

    const data = stockPlaces.filter(place =>
        !placesSet.has(place.id)
    );

    localStorage.set("outputStockPlaces", data);
}