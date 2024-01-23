import {createContext, useContext, useState} from "react";
import OrdersData from "../data/orders";

const OrdersContext = createContext(undefined);
const SetOrdersContext = createContext(undefined);


const OrdersProvider = ({children}) => {
    const [orders, setOrders] = useState(OrdersData);

    return <SetOrdersContext.Provider value={setOrders}>
        <OrdersContext.Provider value={orders}>
            {children}
        </OrdersContext.Provider>
    </SetOrdersContext.Provider>
}

export const useOrders = () => useContext(OrdersContext);
export const useSetOrders = () => useContext(SetOrdersContext);

export default OrdersProvider