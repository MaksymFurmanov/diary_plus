import ProductionItem from "../components/Production/ProductionItem";
import PageTitle from "../components/BasicComponents/PageTitle";
import {useSelector} from "react-redux";
import {selectOrders} from "../features/ordersSlice";

const ProductionPage = () => {
    const orders = useSelector(selectOrders);

    return <>
        <PageTitle name={"Production plan"}/>
        <div className={"ProductionPage v-center"}>
            {orders && (
                orders.map((order, index) => {
                    return (
                        <ProductionItem key={index}
                                        order={order}
                        />
                    )
                })
            )}
        </div>
    </>
}

export default ProductionPage