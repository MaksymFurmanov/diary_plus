import {RxCross2} from "react-icons/rx";
import React from "react";
import {useOrders} from "../../providers/OrdersProvider";
import {useProducts} from "../../providers/ProductsProvider";
import {useMaterials} from "../../providers/MaterialsProvider";

const StockList = ({type}) => {
    const orders = useOrders();
    const products = useProducts();
    const materials = useMaterials();

    const data = {
        entry: materials,
        output: orders
    }

    const length = data[type].length;

    const itemsData = data[type].map((item) => {
        if (type === "entry") {
            if (item.arriving_date !== "null") {
                return {
                    pallet_color: item.pallet_color,
                    per_pallet: item.per_pallet,
                    itemName: `Surovina: ${item.name}`,
                    itemDetails: `Zdroj: ${item.supplier}`
                }
            }
            console.log(item);
        } else {
            if (item.done_date !== null) {
                const foundProduct = products.find((product) =>
                    product.product_id === item.product_id);
                return {
                    pallet_color: item.pallet_color,
                    per_pallet: item.per_pallet,
                    itemName: `Produkt: ${foundProduct.name}`,
                    itemDetails: `Typ: ${foundProduct.type}`
                }
            }
        }
        return null
    })

    const itemsList = itemsData !== null
        ? itemsData.map((item, index) => {
            return <React.Fragment key={index}>
                <li>
                    <div className={"StockPlace"}
                         style={{backgroundColor: item.pallet_color}}/>
                    <div><p>—</p></div>
                    <div>
                        <p>Počet: {item.per_pallet}</p>
                        <p>{item.itemName}</p>
                        <p>{item.itemDetails}</p>
                    </div>
                </li>
                {index !== length - 1 && <div className={"line"}/>}
            </React.Fragment>
        })
        : <></>

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