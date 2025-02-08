import VerticalBoxes from "./VerticalBoxes";
import HorizontalBox from "./HorizontalBox";
import {EntryStockPlace, Material, Order, OutputStockPlace} from "../../types";
import {useSelector} from "react-redux";
import {selectEntryStock} from "../../features/enteryStockPlacesSlice";
import {selectOutputStock} from "../../features/outputStockPlacesSlice";
import {RootState} from "../../state";

const Boxes = ({type, items, manager}: {
    type: "entry" | "output",
    items: Material[] | Order[],
    manager: boolean
}) => {
    const stockSelector: (state: RootState) => EntryStockPlace[] | OutputStockPlace[] = type === "entry" ? selectEntryStock : selectOutputStock;
    const stockPlaces = useSelector(stockSelector) || [];

    let globalIndex = 0;

    return (
        <>
            {Array.from({length: 12}, (_, i) => i).map((i) => {
                const startIndex = globalIndex;
                if (i > 3 && i < 8) {
                    globalIndex += 12;
                    return <VerticalBoxes key={i}
                                          startIndex={startIndex}
                                          type={type}
                                          items={items}
                                          stockPlaces={stockPlaces}
                                          manager={manager}
                    />
                } else {
                    globalIndex += 8;
                    return <HorizontalBox key={i}
                                          startIndex={startIndex}
                                          type={type}
                                          items={items}
                                          stockPlaces={stockPlaces}
                                          manager={manager}
                    />
                }
            })}
        </>
    );
}

export default Boxes;