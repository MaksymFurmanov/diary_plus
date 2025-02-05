import FormatedPlace from "./FormatedPlace";
import {EntryStockPlace, Material, Order, OutputStockPlace} from "../../types";

const VerticalBoxes = ({startIndex, type, items, stockPlaces, manager}: {
    startIndex: number,
    type: "entry" | "output",
    items: Material[] | Order[],
    stockPlaces: EntryStockPlace[] | OutputStockPlace[],
    manager: boolean
}) => {
    return (
        <div className="vertical-stock-boxes">
            <div className={"StockBox vertical-stock-box"}>
                {Array.from({length: 6}, (_, i) => i).map((i) => {

                    return <FormatedPlace key={startIndex + i}
                                          index={startIndex + i}
                                          type={type}
                                          items={items}
                                          stockPlaces={stockPlaces}
                                          manager={manager}
                    />
                })}
            </div>
            <div className={"StockBox vertical-stock-box"}>
                {Array.from({length: 6}, (_, i) => i).map((i) => {

                    return <FormatedPlace key={startIndex + 6 + i}
                                          index={startIndex + 6 + i}
                                          type={type}
                                          items={items}
                                          stockPlaces={stockPlaces}
                                          manager={manager}
                    />
                })}
            </div>
        </div>
    );
}

export default VerticalBoxes;