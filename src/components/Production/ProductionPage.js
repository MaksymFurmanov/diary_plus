import PageTitle from "../BasicComponents/PageTitle";
import ProductionItem from "./ProductionItem";
import {useOrders} from "../../providers/OrdersProvider";

const ProductionPage = () => {
    const orders = useOrders();

    const productionItems = orders.map((order, index) => {
        return <ProductionItem key={index}
                               order={order}/>
    });

    return <>
        <PageTitle name={"Plán výroby"}/>
        {productionItems}
    </>
}

export default ProductionPage