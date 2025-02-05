import {EntryStockPlace, Material, Order, OutputStockPlace} from "../../types";
import StockPlace from "./StockPlace";
import {useSelectedStockPlaces} from "../../providers/SelectedStockPlacesProvider";

const FormatedPlace = ({index, type, items, stockPlaces, manager}: {
    index: number,
    type: "entry" | "output",
    items: Material[] | Order[],
    stockPlaces: EntryStockPlace[] | OutputStockPlace[],
    manager: boolean
}) => {
    const {places, setPlaces} = useSelectedStockPlaces();

    const selectHandler = (placeId: string) => {
        setPlaces((prevState) =>
            prevState.includes(placeId)
                ? prevState.filter((id) => id !== placeId)
                : [...prevState, placeId]
        );
    };

    let palletColor = "#F8F8F8";
    let date: Date | null = null;

    if (type === "entry") {
        const place = (stockPlaces as EntryStockPlace[]).find((placeItem) =>
            placeItem.id === String(index));

        if (place) {
            const material = (items as Material[])
                .find((materialItem) =>
                    materialItem.id === place.material_id);
            if (!material) throw new Error("Material not found");

            palletColor = material.pallet_color;
            date = material.arriving_date || null;
        }
    } else {
        const place = (stockPlaces as OutputStockPlace[])
            .find((placeItem) =>
                placeItem.id === String(index));

        if (place) {
            const order = (items as Order[])
                .find((orderItem) =>
                    orderItem.id === place.order_id);
            if (!order) throw new Error("Order not found");

            palletColor = order.pallet_color;
            date = place.put_date;
        }
    }

    const isSelected = places.includes(String(index));

    return (
        <StockPlace style={{cursor: manager ? "pointer" : "default"}}
                    palletColor={palletColor}
                    date={date}
                    onClick={() => manager && selectHandler(String(index))}
                    selected={isSelected}
        />
    );
}

export default FormatedPlace;