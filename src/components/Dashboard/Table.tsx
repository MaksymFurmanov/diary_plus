import {DashboardType} from "../../types";
import OrderRows from "./OrderRows";
import MaterialRows from "./MaterialRows";

const columns = {
    orders: ["Product", "Type", "Customer", "Status",
        "Volume", "Deadline"],
    materials: ["Material", "Source", "Count per pallet",
        "Number of pallets", "Date of order", "Arrived"]
}

const Table = ({type}: DashboardType) => {
    return (
        <div className={"table-container"}>
            <table>
                <thead>
                <tr>
                    {columns[type].map((name, index) => (
                        <th key={index}>{name}</th>
                    ))}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {type === "orders" ? <OrderRows/> : <MaterialRows/>}
                </tbody>
            </table>
        </div>
    );
}

export default Table