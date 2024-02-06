import PageTitle from "../BasicComponents/PageTitle";
import {useNavigate, useParams} from "react-router-dom";
import {useOrders} from "../../providers/OrdersProvider";
import {useMaterials} from "../../providers/MaterialsProvider";
import OrdersTable from "./OrdersTable";
import OrdersGraph from "./OrdersGraph";
import {BsPlusCircleFill} from "react-icons/bs";

const OrdersPage = () => {
    const {type} = useParams();
    const navigate = useNavigate();

    const items = {
        products_to_product: useOrders(),
        raw_material: useMaterials()
    };

    const title = {
        products_to_product: "Objednávky na výrobu",
        raw_material: "Objednané suroviny"
    }

    const new_order_page = {
        products_to_product: "/orders/products_to_product/new_order",
        raw_material: "/orders/raw_materials/new_order_material"
    }

    return <>
        <div className={"h-stretch-center"}>
            <PageTitle name={title[type]}/>
            <button className={"plus-button"}
                    onClick={() => navigate(new_order_page[type])}>
                <BsPlusCircleFill/>
            </button>
        </div>
        <div className={"OrdersPage"}>
            <OrdersGraph items={items[type]} type={type}/>
            <OrdersTable items={items[type]} type={type}/>
        </div>
    </>
}

export default OrdersPage;