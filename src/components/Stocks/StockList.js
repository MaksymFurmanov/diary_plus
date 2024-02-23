import {RxCross2} from "react-icons/rx";
import React from "react";
import {useOrders} from "../../providers/OrdersProvider";
import {useProducts} from "../../providers/ProductsProvider";
import {useMaterials} from "../../providers/MaterialsProvider";
import {usePlacesToChange, useSetPlacesToChange} from "../../providers/PlacesToChangeProvider";
import useLoadData from "../../hooks/useLoadData";
import {useEntryStock, useSetEntryStock} from "../../providers/EntryStockProvider";
import {useOutputStock, useSetOutputStock} from "../../providers/OutputStockProvider";

const StockList = ({type}) => {
    const products = useProducts();

    const [loadData, setLoadData] = useLoadData();
    const placesToChange = usePlacesToChange();
    const setPlacesToChange = useSetPlacesToChange();

    const places = {
        entry: useEntryStock(),
        output: useOutputStock()
    }
    const setEntryStock = useSetEntryStock();
    const setOutputStock = useSetOutputStock();

    const setStock = (newPlaces) => {
        if (type === "entry") {
            setEntryStock(newPlaces);
        } else if (type === "output") {
            setOutputStock(newPlaces);
        }
    }

    const items = {
        entry: useMaterials(),
        output: useOrders()
    }

    const place_id = {
        entry: 'entery_stock_place_id',
        output: 'output_stock_place_id'
    }

    const item_id = {
        entry: 'material_id',
        output: 'order_id'
    }

    const data_type = {
        entry: "entry-stock-places",
        output: "output-stock-places"
    }

    const length = items[type].length;

    const itemsData = items[type].map((item) => {
        if (type === "entry") {
            if (item.arriving_date !== null) {
                return {
                    material_id: item.material_id,
                    pallet_color: item.pallet_color,
                    per_pallet: item.per_pallet,
                    itemName: `Surovina: ${item.name}`,
                    itemDetails: `Zdroj: ${item.supplier}`
                }
            }
        } else if (type === "output") {
            const foundProduct = products.find((product) =>
                product.product_id === item.product_id);

            return {
                order_id: item.order_id,
                pallet_color: foundProduct.pallet_color,
                per_pallet: foundProduct.per_pallet,
                itemName: `Produkt: ${foundProduct.name}`,
                itemDetails: `Typ: ${foundProduct.type}`
            }
        }
        return null
    });

    const submitHandler = (itemId) => {
        const changedPlaces = placesToChange.map((placeToChange) => {
            const newPlace = places[type].find((place) =>
                place[place_id[type]] === placeToChange);
            newPlace[item_id[type]] = itemId;
            return newPlace;
        });

        loadData(data_type[type], changedPlaces).then(() => {
            const newPlaces = places[type].map((place) => {
                if (placesToChange.find((placeToChange) =>
                    placeToChange === place[place_id[type]])) {
                    const newPlace = {...place}
                    newPlace[item_id[type]] = itemId;
                    return newPlace
                }
                return place
            });
            setStock(newPlaces);
            setPlacesToChange([]);
        });
    }

    const itemsList = itemsData.map((item, index) => {
        if (item !== null) {
            return <React.Fragment key={index}>
                <li>
                    <div className={"StockPlace"}
                         style={{backgroundColor: item.pallet_color}}
                         onClick={() => submitHandler(item[item_id[type]])}/>
                    <div><p>—</p></div>
                    <div>
                        <p>Počet: {item.per_pallet}</p>
                        <p>{item.itemName}</p>
                        <p>{item.itemDetails}</p>
                    </div>
                </li>
                {index !== length - 1 && <div className={"line"}/>}
            </React.Fragment>
        } else {
            return <React.Fragment key={index}></React.Fragment>
        }
    });

    return <ul className={"StockList v-center"}>
        <li><h3>Výber paliet</h3></li>
        <div className={"line"}/>
        <div className={"stock-pallets"}>
            {itemsList}
        </div>
        <li key={itemsList.length}>
            <div className={"StockPlace"}>
                <RxCross2/>
            </div>
            <div><p>—</p></div>
            <div><p>vybrané</p></div>
        </li>
    </ul>
}

export default StockList