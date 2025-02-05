import {useParams} from "react-router-dom";
import {useUser} from "../providers/UserProvider";
import PageTitle from "../components/BasicComponents/PageTitle";
import StockList from "../components/Stocks/StockList";
import Button from "../components/BasicComponents/Button";
import {isManager} from "../utils/storage/departments";
import {getMaterials} from "../utils/storage/materials";
import {getOrders} from "../utils/storage/orders";
import {removeEntryStockPlaces} from "../utils/storage/enteryStockPlaces";
import {removeOutputStockPlaces} from "../utils/storage/outputStockPlaces";
import {useSelectedStockPlaces} from "../providers/SelectedStockPlacesProvider";
import Boxes from "../components/Stocks/Boxes";

const title = {
    entry: "Entry stock",
    output: "Output stock",
};

const StockPage = () => {
    const {user} = useUser();
    if (!user) throw new Error("User not found");
    const manager = isManager(user.employee_id, ["2", "11", "0"]);

    const {type} = useParams();
    if (type !== "entry" && type !== "output") throw new Error("Stock page not found");

    const items = (type === "entry" ? getMaterials() : getOrders()) || [];

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
                    <Boxes type={type}
                           items={items}
                           manager={manager}
                    />
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