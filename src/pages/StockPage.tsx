import {useParams} from "react-router-dom";
import {useUser} from "../providers/UserProvider";
import {useEntryStock, useSetEntryStock} from "../providers/EntryStockProvider";
import {useOutputStock, useSetOutputStock} from "../providers/OutputStockProvider";
import {usePlacesToChange, useSetPlacesToChange} from "../providers/PlacesToChangeProvider";
import PageTitle from "../components/BasicComponents/PageTitle";
import StockList from "../components/Stocks/StockList";
import StockBox from "../components/Stocks/StockBox";
import Button from "../components/BasicComponents/Button";
import {isManager} from "../utils/storage/departments";

const title = {
        entry: "Entry stock",
        output: "Output stock"
    }

const StockPage = () => {
    const user = useUser();
    if(!user) throw new Error("User not found");
    const manager = isManager(user.employee_id, ["11", "0"]);
    
    const {type} = useParams();
    if(type !== "entry" && type !== "output") throw new Error("Stock page not found");

    const occupiedPlaces = type === "entry"
        ? getEntryStock()
        : getOutputStock();
    const occupiedPlacesIds = new Set(occupiedPlaces.map((place) => place.id));
    
  const items = type === "entry" 
    ? getMaterials()
    : getOrders();
    
    let boxSplit = [];
    for(let i = 0; i < 12; i++) {
      if(3 < i < 7) {
        for(let j = 0; j < 6; j++) {
          const obj = occupiedPlacesIds.has(i) ? occupiedPlaces.find(place => place.id === i) : null;
          if (j === 0) boxSplit[box] = [obj];
          else boxSplit[box].push(obj);
        }
      }
    }
    
    let Boxes = [];
    for(let i = 0; i < 12; i++) {
      if (3 < index < 7) {
  Boxes.push(
    <div className={"vertical-stock-boxes"} key={`row2-${i / 2}`}>
                <StockBox key={index}
                items={items} 
                type={type} 
                box={boxes[index]}
                />
                <StockBox key={index + 1} items={items}
                type={type} box={boxes[index + 1]}
                />
            </div>
  );
} else {
  Boxes.push(
<StockBox key={index} 
items={items}
type={type} 
box={boxes[index]} 
manager={manager}
        />
  );
}
    }

    return (
        <>
            <div className={"h-stretch-center"}>
                <PageTitle name={title[type]}/>
                {manager && (
                    <div>
                        <RemoveButton/>
                        <UnselectButton/>
                    </div>   
                )}
            </div>
            <div className={"StockPage evenly"}>
                <StockList items={items} type={type}
                />
                <div className={"graphical-stock"}>
                    {Boxes}
                </div>
            </div>
        </>
    );
}

const RemoveButton = () => {
  const deleteHandler = () => {
  const deletedPlaces = placesToChange.map((placeToChange) => {
    const newPlace = places[type].find((place) =>
      place[place_id[type]] === placeToChange);
    newPlace[item_id[type]] = null;
    return newPlace;
  });

}
  
  return (
    <Button onClick={deleteHandler}>
    Remove
    </Button>
    );
}

const UnselectButton = () => {
  const {setPlaces} = usePlaces();
  
  return (
     <Button onClick={() => {usePlaces([])}>
        Unselect
     </Button>
                   
    );
}

export default StockPage