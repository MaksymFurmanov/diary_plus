import {RxCross2} from "react-icons/rx";
import React from "react";
import {useUser} from "../../providers/UserProvider";

const StockList = ({type}: { 
  type: "entry" | "output" 
}) => {
  const items: Material[] | Order[] | null = type === "entry" ? getMaterials() : getOrders()
  
  const length = items.length;

    return (
        <ul className={"StockList v-center"}>
            <li><h3>Pallet selection</h3></li>
            <div className={"line"}/>
            <div className={"stock-pallets"}>
                {items && (
                <Items items={items}/>
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

const Items = ({items}: {
  items: Material[] | Order[],
  type: "entry" | "output"
}) => {
  const user = useUser();
  const manager= useManager(user.employee_id, ["0"]);
    
  const {places, setPlaces} = useSelectedStockPlaces();
  
  const itemsData: DisplayPlaceData = getStockPlaceData(items, type);

const submitHandler = (itemId) => {
  const changedPlaces = stockPlaces.map((stockPlace) => {
    const newPlace = places.find((place) =>
      stockPlace.id === place);
    newPlace.id = itemId;
    return newPlace;
  });

  if(type === "entry") {
    updateEntryStock(places)
  } else {
    updateOutputStock(places)
  }
}

  return itemsData.map((item, index) => {
  <Fragment>
                <li>
                    <div className={"StockPlace"}
                         style={{ backgroundColor: item.pallet_color,
                             cursor: manager ? "pointer" : "default"
                         }}
                         onClick={() => manager && submitHandler(item.id)}/>
                    <div><p>—</p></div>
                    <div>
                        <p>Volume: {item.per_pallet}</p>
                        <p>{item.name}</p>
                        <p>{item.details}</p>
                    </div>
                </li>
                {index !== length - 1 && <div className={"line"}/>}
            </Fragment>
});
}

export default StockList