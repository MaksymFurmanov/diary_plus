import StockPlace from "./StockPlace";
import {useMaterials} from "../../providers/MaterialsProvider";
import {useProducts} from "../../providers/ProductsProvider";
import {useUser} from "../../providers/UserProvider";
import {EntryStockPlace, OutputStockPlace} from "../../types";
import {useSelectedStockPlaces} from "../../providers/SelectedStockPlacesProvider";

const StockBox = ({items, box, type, manager}: {
    items: Mateial[] | Order[],
    box: EntryStockPlace[] | OutputStockPlace[],
    type: "entry" | "output",
    manager: boolean | undefined
}) => {
    const {places, setPlaces} = useSelectedStockPlaces();

    const sizeStyle = type === "vertical"
        ? "vertical-stock-box"
        : "horizontal-stock-box";

    const selectHandler = (placeId) => {
            const occupiedPlaceIndex = places.findIndex((occupiedPlace) =>
                occupiedPlace === placeId);

            if (placesToChangeIndex !== -1) {
                const newPlacesToChange = [...places];
                newPlacesToChange.splice(placesToChangeIndex, 1);
                setPlaces(newPlacesToChange);
                return;
            }
        setPlaces(prevState => [...prevState, placeId]);
    }

    const places = box.map((place, index) => {
        let palletColor = "#F8F8F8";
        let date = null;

        if (place !== null) {
          if(type === "entry") {
            const material: Material = (items as Material[]).find((material) => material.id === (place as EntryStockPlace).material_id);
            
            palletColor = material.palletColor;
            date = material.arriving_date;
          } else {
            const order: Order = (items as Order[]).find((order) => order.id === (place as OutputStockPlace).order_id);
            
           palletColor = order.pallet_collor;
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
                           onClick={() => manager && selectHandler(place.id)}
                           selected={isSelected}
        />
        );
    });

    return (
        <div className={`StockBox ${sizeStyle}`}>
            {places}
        </div>
    );
}

export default StockBox