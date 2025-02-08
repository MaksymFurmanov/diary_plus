import {Material, Order} from "../types";
import {selectProductById} from "../features/productsSlice";
import store from "../state";

export type DisplayPlaceData = {
    id: string;
    pallet_color: string;
    volume: number;
    name: string;
    details: string;
};

export const getStockPlaceData = (
    items: Material[] | Order[],
    type: "entry" | "output"
): DisplayPlaceData[] => {
    const state = store.getState();

    if (type === "entry") {
        return (items as Material[])
            .filter((item) => item.arriving_date !== null)
            .map((item) => ({
                id: item.id,
                pallet_color: item.pallet_color,
                volume: item.per_pallet,
                name: `Raw material: ${item.name}`,
                details: `Source: ${item.supplier}`,
            }));
    } else {
        return (items as Order[]).map((item) => {
            const product = selectProductById(state, item.product_id);
            if (!product) throw new Error("Product for the order not found");

            return {
                id: item.id,
                pallet_color: item.pallet_color,
                volume: item.volume,
                name: `Product: ${product.name}`,
                details: `Type: ${product.type}`,
            };
        });
    }
};