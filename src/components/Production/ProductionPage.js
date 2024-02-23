import PageTitle from "../BasicComponents/PageTitle";
import ProductionItem from "./ProductionItem";
import {useOrders} from "../../providers/OrdersProvider";
import {Fragment} from "react";

const ProductionPage = () => {
    const orders = useOrders();

    const productionItems = orders.map((order, index) => {
        if (order.done_date === null) return <ProductionItem key={index}
                                                             order={order}/>
        else return <Fragment key={index}></Fragment>
    });

    return <>
        <PageTitle name={"Plán výroby"}/>
        {productionItems}
    </>
}

export default ProductionPage