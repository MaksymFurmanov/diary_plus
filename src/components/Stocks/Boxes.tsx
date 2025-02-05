import {getEntryStockPlaces} from "../../utils/storage/enteryStockPlaces";
import {getOutputStockPlaces} from "../../utils/storage/outputStockPlaces";
import VerticalBoxes from "./VerticalBoxes";
import HorizontalBox from "./HorizontalBox";
import {Material, Order} from "../../types";

const Boxes = ({type, items, manager}: {
    type: "entry" | "output",
    items: Material[] | Order[],
    manager: boolean
}) => {
    const stockPlaces = (type === "entry" ? getEntryStockPlaces() : getOutputStockPlaces()) || [];

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