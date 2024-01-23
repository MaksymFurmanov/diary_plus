import Button from "../BasicComponents/Button.tsx";
import products from "../../data/products";
import production_processes from "../../data/production_processes";
import {FaPen} from "react-icons/fa";
import {BiSolidTrashAlt} from "react-icons/bi";

const OrdersTable = ({items, type}) => {
    let tableItems, colNames;
    if (type === 'products_to_product') {
        colNames = ["Produkt", "Typ", "Zákazník", "Status",
            "Počet", "Konečný termín"];

        tableItems = items.map((order, index) => {
            const product = products.find((product) =>
                order.product_id === product.product_id);
            const productionProcess = production_processes
                .find((production_process) =>
                    order.production_process_id
                    === production_process.production_process_id)

            return <tr key={index}>
                <td>{product.name}</td>
                <td>{product.type}</td>
                <td>{order.customer}</td>
                <td>{productionProcess.done_name}</td>
                <td>{order.volume}</td>
                <td>{order.deadline}</td>
                <td>
                    <div>
                        <button><FaPen/></button>
                        <button><BiSolidTrashAlt/></button>
                    </div>
                </td>
            </tr>
        });
    } else if (type === 'raw_material') {
        colNames = ["Jednotka suroviny", "Zdroj", "Počet na paletu",
            "Počet paliet", "Datum objednania", "Prišlo"];

        tableItems = items.map((material, index) => {
            return <tr key={index}>
                <td>{material.name}</td>
                <td>{material.supplier}</td>
                <td>{material.per_pallet}</td>
                <td>{material.volume}</td>
                <td>{material.date_of_order}</td>
                <td>{material.arriving_date
                    ? material.arriving_date
                    : <Button>PRIŠLO</Button>}
                </td>
                <td>
                    <div>
                        <button><FaPen/></button>
                        <button><BiSolidTrashAlt/></button>
                    </div>
                </td>
            </tr>
        })
    }

    const tableHeaders = colNames.map((name, index) => (
        <th key={index}>{name}</th>
    ))

    return <div className={"table-container"}>
        <table>
            <thead>
            <tr>
                {tableHeaders}
                <th></th>
            </tr>
            </thead>
            <tbody>
            {tableItems}
            </tbody>
        </table>
    </div>
}

export default OrdersTable