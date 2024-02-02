import PageTitle from "../BasicComponents/PageTitle";
import {useParams} from "react-router-dom";
import {useOrders} from "../../providers/OrdersProvider";
import {useMaterials} from "../../providers/MaterialsProvider";
import OrdersTable from "./OrdersTable";
import OrdersGraph from "./OrdersGraph";

const OrdersPage = () => {
    const {type} = useParams();

    const items = {
        products_to_product: useOrders(),
        raw_material: useMaterials()
    };

    const title = {
        products_to_product: "Objednávky na výrobu",
        raw_material: "Objednané suroviny"
    }

    return <>
        <PageTitle name={title[type]}/>
        <div className={"OrdersPage"}>
            <OrdersGraph items={items[type]} type={type}/>
            <OrdersTable items={items[type]} type={type}/>
        </div>
    </>
}

export default OrdersPage;