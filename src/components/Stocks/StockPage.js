import PageTitle from "../BasicComponents/PageTitle";
import {useParams} from "react-router-dom";
import StockBox from "./StockBox";
import {useOutputStock} from "../../providers/OutputStockProvider";
import {useEntryStock} from "../../providers/EntryStockProvider";
import StockList from "./StockList";
import Button from "../BasicComponents/Button.tsx";
import {usePlacesToChange, useSetPlacesToChange} from "../../providers/PlacesToChangeProvider";
import useLoadData from "../../hooks/useLoadData";

const StockPage = () => {
    const {type} = useParams();
    const [loadData] = useLoadData();

    //for DELETE
    const placesToChange = usePlacesToChange();
    const setPlacesToChange = useSetPlacesToChange();

    const places = {
        entry: useEntryStock(),
        output: useOutputStock()
    }

    const title = {
        entry: "Vstupný sklad",
        output: "Výstupný sklad"
    }

    let boxSplit = [];
    places[type].forEach((place) => {
        let box = place.box.toString();
        if (!(box in boxSplit)) boxSplit[box] = [place];
        else boxSplit[box].push(place);
    })

    const stockPlacesRow1 = boxSplit.slice(0, 4).map((box, index) => (
        <StockBox key={`row1-${index}`} type={type} box={box}
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

    return <>
        <div className={"h-stretch-center"}>
            <PageTitle name={title[type]}/>
            <div>
                <Button>Vymazať</Button>
                <Button onClick={unselectHandler}>Odznačiť všetko</Button>
            </div>
        </div>
        <div className={"StockPage evenly"}>
            <StockList type={type}/>
            <div className={"graphical-stock"}>
                {allStockPlaces}
            </div>
        </div>
    </>
}

export default StockPage