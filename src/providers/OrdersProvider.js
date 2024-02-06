import {createContext, useContext, useState} from "react";
import ordersData from "../data/orders";

const OrdersContext = createContext(undefined);
const SetOrdersContext = createContext(undefined);


const OrdersProvider = ({children}) => {
    const [orders, setOrders] = useState(ordersData);

    return <SetOrdersContext.Provider value={setOrders}>
        <OrdersContext.Provider value={orders}>
            {children}
        </OrdersContext.Provider>
    </SetOrdersContext.Provider>
}

export const useOrders = () => useContext(OrdersContext);
export const useSetOrders = () => useContext(SetOrdersContext);

export default OrdersProvider