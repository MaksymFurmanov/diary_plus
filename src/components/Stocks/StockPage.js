import PageTitle from "../BasicComponents/PageTitle";
import {useParams} from "react-router-dom";
import StockBox from "./StockBox";
import {useOutputStock} from "../../providers/OutputStockProvider";
import {useEnteryStock} from "../../providers/EnteryStockProvider";
import StockTable from "./StockTable";
import Button from "../BasicComponents/Button.tsx";

const StockPage = () => {
    const {type} = useParams();

    const places = {
        entry: useEnteryStock(),
        output: useOutputStock()
    }

    const title = {
        entry: "Vstupný sklad",
        output: "Výstupný sklad"
    }

    let groupsSplit = [];
    places[type].forEach((place) => {
        let group = place.group.toString();
        if (!(group in groupsSplit)) groupsSplit[group] = [place];
        else groupsSplit[group].push(place);
    })

    const stockPlacesRow1 = groupsSplit.slice(0, 4)
        .map((group, index) => {
            return <StockBox
                key={index}
                type={type}
                group={group}
            />
        });

    let stockPlacesRow2 = [];
    const slicedVerticals = groupsSplit.slice(4, 12);
    for (let i = 0; i < slicedVerticals.length; i += 2) {
        const group1 = slicedVerticals[i];
        const group2 = slicedVerticals[i + 1];

        stockPlacesRow2.push(
            <div className={"vertical-stock-boxes"}>
                <StockBox
                    key={4 + i}
                    type={type}
                    group={group1}
                />
                <StockBox
                    key={5 + i}
                    type={type}
                    group={group2}
                />
            </div>
        );
    }

    const stockPlacesRow3 = groupsSplit.slice(12, 16)
        .map((group, index) => {
            return <StockBox
                key={index + 12}
                type={type}
                group={group}
            />
        });

    const allStockPlaces = [stockPlacesRow1, stockPlacesRow2,
        stockPlacesRow3];

    return <>
        <div className={"stock-header"}>
            <PageTitle name={title[type]}/>
            <div>
                <Button>Vymazať</Button>
                <Button>Odznačiť všetko</Button>
            </div>
        </div>
        <div className={"StockPage"}>
            <StockTable type={type}/>
            <div className={"graphical-stock"}>
                {allStockPlaces}
            </div>
        </div>
    </>
}

export default StockPage