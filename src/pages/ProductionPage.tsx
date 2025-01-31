import {Fragment} from "react";
import ProductionItem from "../components/Production/ProductionItem";
import PageTitle from "../components/BasicComponents/PageTitle";
import {getOrders} from "../utils/storage/orders";

const ProductionPage = () => {
    const orders = getOrders();

    return <>
        <PageTitle name={"Production plan"}/>
        <div className={"ProductionPage v-center"}>
            {orders && (
                orders.map((order, index) => {
                    if (order.done_date === null) {
                        return (
                            <ProductionItem key={index}
                                            order={order}
                            />
                        )
                    } else return <Fragment key={index}/>
                })
            )}
        </div>
    </>
}

export default ProductionPage