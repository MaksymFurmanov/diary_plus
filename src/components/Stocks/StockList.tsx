import {RxCross2} from "react-icons/rx";
import React, {Fragment} from "react";
import {useUser} from "../../providers/UserProvider";
import {updateEntryStock} from "../../utils/storage/enteryStockPlaces";
import {DisplayPlaceData, getStockPlaceData} from "../../utils/getStockPlaceData";
import {useSelectedStockPlaces} from "../../providers/SelectedStockPlacesProvider";
import {isManager} from "../../utils/storage/departments";
import {Material, Order} from "../../types";
import {updateOutputStock} from "../../utils/storage/outputStockPlaces";

const StockList = ({items, type}: {
    items: Material[] | Order[],
    type: "entry" | "output"
}) => {
    const length = items.length;

    return (
        <ul className={"StockList v-center"}>
            <li><h3>Pallet selection</h3></li>
            <div className={"line"}/>
            <div className={"stock-pallets"}>
                {items && (
                    <Items items={items} type={type}/>
                )}
            </div>
            <li key={length}>
                <div className={"StockPlace"}>
                    <RxCross2/>
                </div>
                <div><p>—</p></div>
                <div><p>selected</p></div>
            </li>
        </ul>
    );
}

const Items = ({items, type}: {
    items: Material[] | Order[],
    type: "entry" | "output"
}) => {
    const {user} = useUser();
    if (!user) throw new Error("User not found");
    const manager = isManager(user.employee_id, ["0"]);

    const {places} = useSelectedStockPlaces();

    const itemsData: DisplayPlaceData[] = getStockPlaceData(items, type);

    const submitHandler = (itemId: string) => {
        if (type === "entry") {
            updateEntryStock(places, itemId);
        } else {
            updateOutputStock(places, itemId);
        }
    }

    return (
        <>
            {itemsData.map((item, index) =>
                <Fragment key={index}>
                    <li>
                        <div className={"StockPlace"}
                             style={{
                                 backgroundColor: item.pallet_color,
                                 cursor: manager ? "pointer" : "default"
                             }}
                             onClick={() => manager && submitHandler(item.id)}
                        />
                        <div><p>—</p></div>
                        <div>
                            <p>Volume: {item.volume}</p>
                            <p>{item.name}</p>
                            <p>{item.details}</p>
                        </div>
                    </li>
                    {index !== itemsData.length - 1 && <div className={"line"}/>}
                </Fragment>
            )}
        </>
    );
}

export default StockList