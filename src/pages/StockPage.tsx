import {useParams} from "react-router-dom";
import {useUser} from "../providers/UserProvider";
import PageTitle from "../components/BasicComponents/PageTitle";
import StockList from "../components/Stocks/StockList";
import StockBox from "../components/Stocks/StockBox";
import Button from "../components/BasicComponents/Button";
import {isManager} from "../utils/storage/departments";
import {getMaterials} from "../utils/storage/materials";
import {getOrders} from "../utils/storage/orders";
import {getEntryStockPlaces, removeEntryStockPlaces} from "../utils/storage/enteryStockPlaces";
import {getOutputStockPlaces, removeOutputStockPlaces} from "../utils/storage/outputStockPlaces";
import {useSelectedStockPlaces} from "../providers/SelectedStockPlacesProvider";
import {EntryStockPlace, OutputStockPlace} from "../types";

const title = {
    entry: "Entry stock",
    output: "Output stock",
};

const StockPage = () => {
    const {user} = useUser();
    if (!user) throw new Error("User not found");
    const manager = isManager(user.employee_id, ["11", "0"]);

    const {type} = useParams();
    if (type !== "entry" && type !== "output") throw new Error("Stock page not found");

    const items = type === "entry" ? getMaterials() || [] : getOrders() || [];

    let boxSplit = [];

    if (type === "entry") {
        const entryPlaces = getEntryStockPlaces() || [];
        for (let i = 0; i < 12; i++) {
            if (i > 3 && i < 7) {
                for (let j = 0; j < 6; j++) {
                    const obj = entryPlaces.find((place: EntryStockPlace) => place.id === String(i)) || undefined;
                    if (j === 0) boxSplit[i] = [obj];
                    else boxSplit[i].push(obj);
                }
            }
        }
    } else {
        const outputPlaces = getOutputStockPlaces() || [];
        for (let i = 0; i < 12; i++) {
            if (i > 3 && i < 7) {
                for (let j = 0; j < 6; j++) {
                    const obj = outputPlaces.find((place: OutputStockPlace) => place.id === String(i)) || undefined;
                    if (j === 0) boxSplit[i] = [obj];
                    else boxSplit[i].push(obj);
                }
            }
        }
    }

    let Boxes = [];
    for (let i = 0; i < 12; i++) {
        if (i > 3 && i < 7) {
            Boxes.push(
                <div className="vertical-stock-boxes" key={i}>
                    <StockBox key={i}
                              items={items}
                              type={type}
                              form={"vertical"}
                              box={boxSplit[i]}
                              manager={manager}
                    />
                    <StockBox key={i + 1}
                              items={items}
                              type={type}
                              form={"vertical"}
                              box={boxSplit[i + 1]}
                              manager={manager}
                    />
                </div>
            );
        } else {
            Boxes.push(
                <StockBox key={i}
                          items={items}
                          type={type}
                          box={boxSplit[i]}
                          form={"horizontal"}
                          manager={manager}
                />
            );
        }
    }

    return (
        <>
            <div className="h-stretch-center">
                <PageTitle name={title[type]}/>
                {manager && (
                    <div>
                        <RemoveButton type={type}/>
                        <UnselectButton/>
                    </div>
                )}
            </div>
            <div className="StockPage evenly">
                <StockList items={items} type={type}/>
                <div className="graphical-stock">
                    {Boxes}
                </div>
            </div>
        </>
    );
};

const RemoveButton = ({type}: { type: "entry" | "output" }) => {
    const {places, setPlaces} = useSelectedStockPlaces();

    const removeHandler = () => {
        if (type === "entry") {
            removeEntryStockPlaces(places);
        } else {
            removeOutputStockPlaces(places);
        }
        setPlaces([]);
    };

    return (
        <Button onClick={removeHandler}>
            Remove
        </Button>
    );
};

const UnselectButton = () => {
    const {setPlaces} = useSelectedStockPlaces();

    return (
        <Button onClick={() => {
            setPlaces([])
        }}>
            Unselect
        </Button>
    );
};

export default StockPage;