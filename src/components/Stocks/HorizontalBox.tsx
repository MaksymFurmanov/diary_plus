import FormatedPlace from "./FormatedPlace";
import {EntryStockPlace, Material, Order, OutputStockPlace} from "../../types";

const HorizontalBox = ({startIndex, type, items, stockPlaces, manager}: {
    startIndex: number,
    type: "entry" | "output",
    items: Material[] | Order[],
    stockPlaces: EntryStockPlace[] | OutputStockPlace[],
    manager: boolean
}) => {
    return (
        <div className={"StockBox horizontal-stock-box"}>
            {Array.from({length: 8}, (_, i) => i).map((i) => {

                return <FormatedPlace key={startIndex + i}
                                      index={startIndex + i}
                                      type={type}
                                      items={items}
                                      stockPlaces={stockPlaces}
                                      manager={manager}
                />;
            })}
        </div>
    );
}

export default HorizontalBox;