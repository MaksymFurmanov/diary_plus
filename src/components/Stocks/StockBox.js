import StockPlace from "./StockPlace";
import {useOrders} from "../../providers/OrdersProvider";
import {useMaterials} from "../../providers/MaterialsProvider";
import {usePlacesToChange, useSetPlacesToChange} from "../../providers/PlacesToChangeProvider";

const StockBox = ({box, type}) => {
    const items = {
        entry: useMaterials(),
        output: useOrders()
    }
    const placesToChange = usePlacesToChange();
    const setPlacesToChange = useSetPlacesToChange();

    const size = box.length;

    const place_id = {
        entry: 'entry_stock_place_id',
        output: 'output_stock_place_id'
    }

    const item_id = {
        entry: 'material_id',
        output: 'order_id'
    }

    const required_date = {
        entry: 'arriving_date',
        output: 'done_date'
    }

    let className = {
        6: "vertical-stock-box",
        8: "horizontal-stock-box"
    }

    const selectHandler = (place) => {
        const placeId = place[place_id[type]];

        if (placeId !== undefined) {
            const placesToChangeIndex = placesToChange.findIndex((placesToChangeItem) =>
                placesToChangeItem === placeId);

            if (placesToChangeIndex !== -1) {
                const newPlacesToChange = [...placesToChange];
                newPlacesToChange.splice(placesToChangeIndex, 1);
                setPlacesToChange(newPlacesToChange);
                return;
            }
        }
        setPlacesToChange(prevState => [...prevState, placeId]);
    }

    const places = box.map((place, index) => {
        let palletColor = "#F8F8F8";
        let date;
        const itemId = place[item_id[type]];

        if (itemId !== null) {
            let foundItem = items[type].find((item) =>
                itemId === item[item_id[type]]);

            if(type === "output") {
                foundItem = foundItem.product;
            }

            date = foundItem[required_date[type]];
            palletColor = foundItem.pallet_color;
        }

        return (
            <StockPlace key={index}
                        palletColor={palletColor}
                        date={date}
                        onClick={() => selectHandler(place)}
                        selected={placesToChange.find((id) =>
                            id === place[place_id[type]])}
            />
        );
    });

    return <div className={`StockBox ${className[size]}`}>
        {places}
    </div>
}

export default StockBox