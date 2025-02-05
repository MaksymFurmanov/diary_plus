import { OutputStockPlace } from "../../types";

export const getOutputStockPlaces = (outputStockPlacesRaw: string | null): OutputStockPlace[] => {
    return outputStockPlacesRaw ? JSON.parse(outputStockPlacesRaw) as OutputStockPlace[] : [];
};

export const updateOutputStock = (
    stockPlaces: OutputStockPlace[],
    places: string[],
    orderId: string
): OutputStockPlace[] => {
    const placesSet = new Set(places);

    let data = stockPlaces.map(stockPlace =>
        placesSet.has(stockPlace.id)
            ? { ...stockPlace, order_id: orderId }
            : stockPlace
    );

    placesSet.forEach(place => {
        data.push({
            id: place,
            order_id: orderId,
            put_date: new Date()
        });
    });

    return data;
};

export const removeOutputStockPlaces = (
    stockPlaces: OutputStockPlace[],
    places: string[]
): OutputStockPlace[] => {
    const placesSet = new Set(places);
    return stockPlaces.filter(place => !placesSet.has(place.id));
};