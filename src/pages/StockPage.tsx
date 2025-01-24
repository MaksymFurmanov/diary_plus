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

const StockPage = () => {
    const user = useUser();
    const manager = isManager(user.employee_id, ["11", "0"]);

    const places = {
        entry: useEntryStock(),
        output: useOutputStock()
    }
    const setEntryStock = useSetEntryStock();
    const setOutputStock = useSetOutputStock();
    const placesToChange = usePlacesToChange();
    const setPlacesToChange = useSetPlacesToChange();

    const {type} = useParams();

    const setStock = (newItems) => {
        if (type === "entry") {
            setEntryStock(newItems);
        } else if (type === "output") {
            setOutputStock(newItems);
        }
    }

    const title = {
        entry: "Vstupný sklad",
        output: "Výstupný sklad"
    }

    const place_id = {
        entry: "entry_stock_place_id",
        output: "output_stock_place_id"
    }

    const item_id = {
        entry: 'material_id',
        output: 'product_id'
    }

    const route = {
        entry: "entry-stock-places",
        output: "output-stock-places"
    }

    let boxSplit = [];
    places[type].forEach((place) => {
        let box = place.box.toString();
        if (!(box in boxSplit)) boxSplit[box] = [place];
        else boxSplit[box].push(place);
    })

    const stockPlacesRow1 = boxSplit.slice(0, 4).map((box, index) => (
        <StockBox key={`row1-${index}`} type={type} box={box} manager={manager}
        />
    ));

    let stockPlacesRow2 = [];
    const slicedVerticals = boxSplit.slice(4, 12);
    for (let i = 0; i < slicedVerticals.length; i += 2) {
        const box1 = slicedVerticals[i];
        const box2 = slicedVerticals[i + 1];

        stockPlacesRow2.push(
            <div className={"vertical-stock-boxes"} key={`row2-${i / 2}`}>
                <StockBox key={`row2-${i}`} type={type} box={box1}/>
                <StockBox key={`row2-${i + 1}`} type={type} box={box2}/>
            </div>
        );
    }

    const stockPlacesRow3 = boxSplit.slice(12, 16).map((box, index) => (
        <StockBox key={`row3-${index}`} type={type} box={box}/>
    ));

    const allStockPlaces = [stockPlacesRow1, stockPlacesRow2, stockPlacesRow3];

    const unselectHandler = () => {
        setPlacesToChange([]);
    }

    const deleteHandler = () => {
        const deletedPlaces = placesToChange.map((placeToChange) => {
            const newPlace = places[type].find((place) =>
                place[place_id[type]] === placeToChange);
            newPlace[item_id[type]] = null;
            return newPlace;
        });

        /*loadData(route[type], deletedPlaces).then(() => {
            const newPlaces = places[type].map((place) => {
                if (placesToChange.find((placeToChange) =>
                    placeToChange === place[place_id[type]])) {
                    const newPlace = {...place}
                    newPlace[item_id[type]] = null;
                    return newPlace
                }
                return place
            });
            setStock(newPlaces);
            unselectHandler();
        });*/
    }

    return (
        <>
            <div className={"h-stretch-center"}>
                <PageTitle name={title[type]}/>
                {manager && (
                    <div>
                        <Button onClick={deleteHandler}>Remove</Button>
                        <Button onClick={unselectHandler}>Unselect</Button>
                    </div>
                )}
            </div>
            <div className={"StockPage evenly"}>
                <StockList type={type}/>
                <div className={"graphical-stock"}>
                    {allStockPlaces}
                </div>
            </div>
        </>
    );
}

export default StockPage