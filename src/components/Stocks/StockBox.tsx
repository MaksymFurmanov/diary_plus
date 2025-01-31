import StockPlace from "./StockPlace";
import {EntryStockPlace, Material, Order, OutputStockPlace} from "../../types";
import {useSelectedStockPlaces} from "../../providers/SelectedStockPlacesProvider";

const StockBox = ({items, box, type, form, manager}: {
    items: Material[] | Order[],
    box: Array<EntryStockPlace | OutputStockPlace | undefined>,
    type: "entry" | "output",
    form: "vertical" | "horizontal",
    manager: boolean | undefined
}) => {
    const {places, setPlaces} = useSelectedStockPlaces();

    const selectHandler = (placeId: string) => {
        const occupiedPlaceIndex = places.findIndex((occupiedPlace) =>
            occupiedPlace === placeId);

        if (occupiedPlaceIndex !== -1) {
            const newPlacesToChange = [...places];
            newPlacesToChange.splice(occupiedPlaceIndex, 1);
            setPlaces(newPlacesToChange);
            return;
        }
        setPlaces(prevState => [...prevState, placeId]);
    }

    const Places = box.map((place, index) => {
        let palletColor = "#F8F8F8";
        let date = null;

        if (place !== null) {
            if (type === "entry") {
                const material = (items as Material[])
                    .find((material) =>
                        material.id === (place as EntryStockPlace).material_id
                    );
                if(!material) throw new Error("Material not found");

                palletColor = material.pallet_color;
                date = material.arriving_date;
            } else {
                const order = (items as Order[])
                    .find((order) =>
                        order.id === (place as OutputStockPlace).order_id
                    );
                if(!order) throw new Error("Order not found");

                palletColor = order.pallet_color;
                date = (place as OutputStockPlace).put_date;
            }
        }

        const isSelected = !!places.find((id) =>
            id === place?.id);

        return (
            <StockPlace key={index}
                        style={{cursor: manager ? "pointer" : "default"}}
                        palletColor={palletColor}
                        date={date}
                        onClick={() => manager && selectHandler(String(index))}
                        selected={isSelected}
            />
        );
    });

    return (
        <div className={`StockBox ${form === "vertical"
            ? "vertical-stock-box"
            : "horizontal-stock-box"}`}
        >
            {Places}
        </div>
    );
}

export default StockBox