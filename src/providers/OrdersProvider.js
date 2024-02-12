import {createContext, useContext} from "react";
import useReadData from "../hooks/useReadData";

const OrdersContext = createContext(undefined);
const SetOrdersContext = createContext(undefined);

const OrdersProvider = ({children}) => {
    const [orders, setOrders, loading] = useReadData("orders");

    return <SetOrdersContext.Provider value={setOrders}>
        <OrdersContext.Provider value={orders}>
            {loading ? <p>Loading...</p>: children}
        </OrdersContext.Provider>
    </SetOrdersContext.Provider>
}

export const useOrders = () => useContext(OrdersContext);
export const useSetOrders = () => useContext(SetOrdersContext);

export default OrdersProvider