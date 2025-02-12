import {OutputStockPlace} from "../../types";
import {getMaterialById} from "./materials";
import outputStockPlaces from "../../initialData/outputStockPlaces";

export const getOutputStockPlaces = (): OutputStockPlace[] => {
    const outputStockPlacesRaw = localStorage.getItem("outputStockPlaces");
    return outputStockPlacesRaw ? JSON.parse(outputStockPlacesRaw) as OutputStockPlace[] : outputStockPlaces;
};

export const updateOutputStock = (places: string[], orderId: string): OutputStockPlace[] => {
    const stockPlaces = getOutputStockPlaces();
    if (!getMaterialById(orderId)) throw new Error("The order not found");

    const placesSet = new Set(places);

    const updatedStockPlaces = stockPlaces.map(stockPlace =>
        placesSet.has(stockPlace.id)
            ? {...stockPlace, order_id: orderId, put_date: new Date()}
            : stockPlace
    );

    const newStockPlaces = [...updatedStockPlaces, ...Array.from(placesSet).map(id => ({
        id,
        order_id: orderId,
        put_date: new Date()
    }))];

    localStorage.setItem("outputStockPlaces", JSON.stringify(newStockPlaces));
    return newStockPlaces;
};

export const deleteOutputStockPlaces = (places: string[]): OutputStockPlace[] => {
    const stockPlaces = getOutputStockPlaces();
    const placesSet = new Set(places);

    const updatedStockPlaces = stockPlaces.filter(place => !placesSet.has(place.id));

    localStorage.setItem("outputStockPlaces", JSON.stringify(updatedStockPlaces));
    return updatedStockPlaces;
};