import {useParams} from "react-router-dom";
import {useEffect} from "react";
import PageTitle from "../components/BasicComponents/PageTitle";
import OrderForm from "../components/Orders/OrderForm";
import {useOrderInput} from "../providers/OrderInputProvider";
import {getOrderById} from "../utils/storage/orders";
import useExitAlert from "../hooks/useExitAlert";

const OrderPage = ({existing}: {
    existing: boolean
}) => {
    const {orderId} = useParams();

    const {order, setOrder} = useOrderInput();

    const {ExitAlert, exitFunction} = useExitAlert(order.changed && existing, "dashboard/orders");

    useEffect(() => {
        if (!existing) return;

        const existingOrder = getOrderById(orderId);
        if (!existingOrder) throw new Error("Order not found");

        setOrder(prevState => {
            return {
                ...prevState,
                id: existingOrder.id,
                product_id: existingOrder.product_id,
                product_name: "",
                customer: existingOrder.customer,
                volume: existingOrder.volume,
                deadline: existingOrder.deadline.toISOString().slice(0, 8),
                pallet_color: existingOrder.pallet_color,
                changed: false
            }
        });
    }, [existing, orderId, setOrder]);


    return (
        <>
            <PageTitle name={existing ? "Order" : "New order"}
                       onBack={exitFunction}
            />

            <OrderForm/>

            {ExitAlert}
        </>
    );
};

export default OrderPage;