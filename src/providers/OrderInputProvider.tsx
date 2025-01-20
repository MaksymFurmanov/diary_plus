import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {OrderInput} from "../types";

export type OrderType = {
    order: OrderInput;
    setOrder: Dispatch<SetStateAction<OrderInput>>
}

const OrderInputContext =
    createContext<OrderType | undefined>(undefined);

const initialState: OrderInput = {
    id: undefined,
    product_name: "",
    product_id: "",
    customer: "",
    volume: 100,
    deadline: "",
    pallet_color: "",
    changed: false
}

const OrderInputProvider = ({children}: {
    children: ReactNode
}) => {
    const [order, setOrder] = useState<OrderInput>(initialState);

    return (
        <OrderInputContext.Provider value={{order, setOrder}}>
            {children}
        </OrderInputContext.Provider>
    );
}

export const useOrderInput = () => {
    const context = useContext(OrderInputContext);
    if (!context) {
        throw new Error("Order context is not found");
    }
    return context;
};

export default OrderInputProvider;