import StockPlace from "./StockPlace";
import {useMaterials} from "../../providers/MaterialsProvider";
import {useProducts} from "../../providers/ProductsProvider";
import {useUser} from "../../providers/UserProvider";
import {EntryStockPlace, OutputStockPlace} from "../../types";
import {useSelectedStockPlaces} from "../../providers/SelectedStockPlacesProvider";

const StockBox = ({box, type}: {
    box: EntryStockPlace[] | OutputStockPlace[],
    type: "entry" | "output",
    manager: boolean | undefined
}) => {

    const items = {
        entry: useMaterials(),
        output: useProducts()
    }
    const {places, setPlaces} = useSelectedStockPlaces();

    const required_date = {
        entry: 'arriving_date',
        output: 'done_date'
    }

    const sizeStyle = box.length === 6
        ? "vertical-stock-box"
        : "horizontal-stock-box";

    const selectHandler = (place) => {
        const placeId = place[place_id[type]];

        if (placeId !== undefined) {
            const placesToChangeIndex = places.findIndex((placesToChangeItem) =>
                placesToChangeItem === placeId);

            if (placesToChangeIndex !== -1) {
                const newPlacesToChange = [...places];
                newPlacesToChange.splice(placesToChangeIndex, 1);
                setPlaces(newPlacesToChange);
                return;
            }
        }
        setPlaces(prevState => [...prevState, placeId]);
    }

    const places = box.map((place, index) => {
        let palletColor = "#F8F8F8";
        let date;
        const itemId = place[item_id[type]];

        if (itemId !== null) {
            let foundItem = items[type].find((item) =>
                itemId === item[item_id[type]]);
            date = foundItem[required_date[type]];
            palletColor = foundItem.pallet_color;
        }

        const isSelected = !!places.find((id) =>
            id === place[place_id[type]]);

        return <StockPlace key={index}
                           style={{cursor: manager ? "pointer" : "default"}}
                           palletColor={palletColor}
                           date={date}
                           onClick={() => manager && selectHandler(place.id)}
                           selected={isSelected}
        />;
    });

    return (
        <div className={`StockBox ${sizeStyle}`}>
            {places}
        </div>
    );
}

export default StockBox