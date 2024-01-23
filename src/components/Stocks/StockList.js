import materials from "../../data/materials";
import products from "../../data/products";
import {RxCross2} from "react-icons/rx";
import React from "react";

const StockList = ({type}) => {
    const data = {
        entry: materials,
        output: products
    }

    const length = data[type].length;

    const itemsList = data[type].map((item, index) => {
        return <>
            <li key={index}>
                <div className={"StockPlace"}
                     style={{backgroundColor: item.pallet_color}}/>
                <div><p>—</p></div>
                <div>
                    <p>Počet: {item.per_pallet}</p>
                    {type === "entry"
                        ? <><p>{`Surovina: ${item.name}`}</p>
                            <p>{`Zdroj: ${item.supplier}`}</p></>
                        : <><p>{`Produkt: ${item.name}`}</p>
                            <p>{`Typ: ${item.type}`}</p></>}
                </div>
            </li>
            {index !== length - 1 && <div className={"line"}/>}
        </>
    })

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